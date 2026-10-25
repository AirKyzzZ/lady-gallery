import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const SITE = 'https://lady-gallery.netlify.app'
const read = (path: string): string => readFileSync(path, 'utf8')

const allHtml = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return allHtml(path)
    return name.endsWith('.html') ? [path] : []
  })

const jsonLdTypes = (html: string): string[] =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => {
    const data = JSON.parse(m[1] ?? '{}') as { '@graph'?: { '@type': string }[]; '@type'?: string }
    const nodes = data['@graph'] ?? [data]
    return nodes.map((node) => node['@type'] ?? '')
  })

describe('seo', () => {
  it('sets canonical and paired hreflang on an artist page', () => {
    const page = read('dist/artistes/kate-bush/index.html')
    expect(page).toContain(`<link rel="canonical" href="${SITE}/artistes/kate-bush/"`)
    expect(page).toContain(`hreflang="en" href="${SITE}/en/artists/kate-bush/"`)
    expect(page).toContain(`hreflang="fr" href="${SITE}/artistes/kate-bush/"`)
    expect(page).toContain('hreflang="x-default"')
  })

  it('describes artists as Person with breadcrumbs', () => {
    expect(jsonLdTypes(read('dist/artistes/kate-bush/index.html'))).toEqual(
      expect.arrayContaining(['Person', 'BreadcrumbList']),
    )
  })

  it('emits two Person entities on duo pages', () => {
    const types = jsonLdTypes(read('dist/artistes/madonna-beyonce/index.html'))
    expect(types.filter((type) => type === 'Person')).toHaveLength(2)
  })

  it('describes the organiser but no event while the facts are placeholders', () => {
    const types = jsonLdTypes(read('dist/index.html'))
    expect(types).toContain('Organization')
    expect(types).not.toContain('Event')
  })

  it('sets open graph tags with an absolute image', () => {
    const home = read('dist/en/index.html')
    expect(home).toContain('<meta property="og:locale" content="en_GB"')
    expect(home).toMatch(new RegExp(`<meta property="og:image" content="${SITE}/`))
  })

  it('points robots.txt at the sitemap', () => {
    expect(read('dist/robots.txt')).toContain(`Sitemap: ${SITE}/sitemap-index.xml`)
  })

  it('lists artist pages in llms.txt', () => {
    const llms = read('dist/llms.txt')
    expect(llms).toContain(`${SITE}/en/artists/kate-bush/`)
    expect(llms).toContain(`${SITE}/artistes/kate-bush/`)
  })

  it('gives every page a 50 to 160 character description', () => {
    for (const file of allHtml('dist')) {
      const match = read(file).match(/<meta name="description" content="([^"]*)"/)
      expect(match?.[1]?.length ?? 0, file).toBeGreaterThanOrEqual(50)
      expect(match?.[1]?.length ?? 0, file).toBeLessThanOrEqual(160)
    }
  })

  it('keeps 404 pages out of the index', () => {
    expect(read('dist/404.html')).toContain('<meta name="robots" content="noindex"')
  })

  it('pairs every french and english page in the sitemap with the same codes as the pages', () => {
    const sitemap = read('dist/sitemap-0.xml')
    expect(sitemap).toContain(`<xhtml:link rel="alternate" hreflang="en" href="${SITE}/en/artists/kate-bush/"/>`)
    expect(sitemap).toContain(`<xhtml:link rel="alternate" hreflang="fr" href="${SITE}/arts/musique/"/>`)
    expect(sitemap).not.toContain('hreflang="fr-FR"')
  })

  it('titles artist pages for biography searches', () => {
    expect(read('dist/artistes/kate-bush/index.html')).toContain('<title>Kate Bush : biographie et œuvres | Lady Gallery</title>')
    expect(read('dist/en/artists/kate-bush/index.html')).toContain('<title>Kate Bush: biography and work | Lady Gallery</title>')
  })

  it('gives the biography its own heading', () => {
    expect(read('dist/artistes/kate-bush/index.html')).toMatch(/<h2[^>]*>Biographie<\/h2>/)
  })

  it('describes the website with a raster organisation logo', () => {
    const home = read('dist/index.html')
    expect(jsonLdTypes(home)).toContain('WebSite')
    expect(home).toContain('apple-touch-icon.png')
    expect(home).toContain('<meta property="og:image:alt"')
  })

  it('gives each duo member her own identifier', () => {
    const ids = [...read('dist/artistes/madonna-beyonce/index.html').matchAll(/"@id":"([^"]*#person-[^"]*)"/g)].map((m) => m[1])
    expect(new Set(ids).size).toBe(2)
  })
})
