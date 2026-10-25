import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

type RawFacts = {
  slug: string
  years: string
  nationality: { fr: string; en: string }
  sources: string[]
  image: (Record<string, unknown> & { commonsFile?: string }) | null
}

const dir = process.argv[2] ?? '.superpowers/sdd/2026-10-25-lady-gallery-site'
const out = process.argv[3] ?? 'src/data/artist-facts.json'

const merged = Object.fromEntries(
  readdirSync(dir)
    .filter((name) => /^facts-.+\.json$/.test(name))
    .flatMap((name) => JSON.parse(readFileSync(join(dir, name), 'utf8')) as RawFacts[])
    .map(({ slug, years, nationality, sources, image }) => {
      const { commonsFile: _commonsFile, ...kept } = image ?? {}
      return [slug, { years, nationality, sources, ...(image ? { image: kept } : {}) }]
    }),
)

writeFileSync(out, `${JSON.stringify(merged, null, 2)}\n`)
console.log(`Merged facts for ${Object.keys(merged).length} artists into ${out}`)
