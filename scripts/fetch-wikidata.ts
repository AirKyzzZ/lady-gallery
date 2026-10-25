import { readFileSync, writeFileSync } from 'node:fs'

type Facts = Record<string, { sources: string[] }>
type Entry = { slug: string; names: string[] }

const facts: Facts = JSON.parse(readFileSync('src/data/artist-facts.json', 'utf8'))
const registry = readFileSync('src/data/artists.ts', 'utf8')
const entries: Entry[] = [...registry.matchAll(/\['([a-z-]+)', \[([^\]]+)\]/g)].map((m) => ({
  slug: m[1] ?? '',
  names: [...(m[2] ?? '').matchAll(/["']([^"']+)["']/g)].map((n) => n[1] ?? ''),
}))

const enTitle = (slug: string, name: string, isDuo: boolean): string => {
  const pages = (facts[slug]?.sources ?? []).filter((s) => s.startsWith('https://en.wikipedia.org/wiki/'))
  const page = isDuo ? pages.find((p) => decodeURI(p).includes(name.replace(/ /g, '_'))) : pages[0]
  if (!page) throw new Error(`No English Wikipedia source for ${name} (${slug})`)
  return decodeURI(page.split('/wiki/')[1] ?? '').replace(/_/g, ' ')
}

const titles = entries.flatMap(({ slug, names }) => names.map((name) => ({ slug, title: enTitle(slug, name, names.length > 1) })))
const ids = new Map<string, string>()

for (let i = 0; i < titles.length; i += 40) {
  const batch = titles.slice(i, i + 40).map((t) => t.title)
  const lookup = await fetch(
    `https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&props=sitelinks&sitefilter=enwiki&redirects=yes&format=json&titles=${encodeURIComponent(batch.join('|'))}`,
    { headers: { 'User-Agent': 'LadyGalleryBot/1.0 (student event site)' } },
  )
  if (!lookup.ok) throw new Error(`Wikidata request failed: ${lookup.status}`)
  const linked = (await lookup.json()) as { entities: Record<string, { id: string; sitelinks?: { enwiki?: { title: string } } }> }
  for (const entity of Object.values(linked.entities)) {
    const title = entity.sitelinks?.enwiki?.title
    if (title && entity.id.startsWith('Q')) ids.set(title, entity.id)
  }
}

const result: Record<string, string[]> = {}
for (const { slug, title } of titles) {
  const id = ids.get(title)
  if (!id) throw new Error(`No Wikidata item for "${title}" (${slug})`)
  result[slug] = [...(result[slug] ?? []), id]
}

writeFileSync('src/data/wikidata.json', `${JSON.stringify(result, null, 2)}\n`)
console.log(`Wrote Wikidata ids for ${Object.keys(result).length} artists`)
