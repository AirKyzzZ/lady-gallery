import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { ARTISTS } from '../src/data/artists'
import { checkDistLinks } from '../scripts/check-dist-links'

const read = (path: string): string => readFileSync(path, 'utf8')

describe('accessibility polish', () => {
  it('names the language toggle with its visible text', () => {
    const html = read('dist/artistes/kate-bush/index.html')
    expect(html).toMatch(/class="lang-toggle"[^>]*aria-label="EN[^"]*"/)
  })

  it('labels breadcrumbs and pager in the page language', () => {
    const html = read('dist/artistes/kate-bush/index.html')
    expect(html).toContain('aria-label="Fil d’Ariane"')
    expect(html).toContain('aria-label="Artiste précédente et suivante"')
    expect(read('dist/en/artists/kate-bush/index.html')).toContain('aria-label="Breadcrumb"')
  })

  it('marks english work titles as english on french pages', () => {
    expect(read('dist/artistes/kate-bush/index.html')).toMatch(/<cite[^>]*><span lang="en"[^>]*>Wuthering Heights<\/span>/)
  })

  it('offers the language switch in the footer too', () => {
    const footer = read('dist/index.html').split('<footer')[1] ?? ''
    expect(footer).toContain('href="/en/"')
  })

  it('stamps the french ticket in french', () => {
    expect(read('dist/index.html')).toContain('Entrée libre')
    expect(read('dist/index.html')).not.toContain('Admit one')
  })
})

describe('link checker', () => {
  it('reports a broken srcset entry', () => {
    expect(checkDistLinks('tests/fixtures/broken-dist')).toEqual(['/index.html -> /missing.avif'])
  })
})

describe('entity links', () => {
  it('links every woman to her wikidata entry', () => {
    for (const artist of ARTISTS) expect(artist.wikidata, artist.slug).toHaveLength(artist.names.length)
  })

  it('gives each duo member her own description', () => {
    const html = read('dist/artistes/madonna-beyonce/index.html')
    const descriptions = [...html.matchAll(/"@type":"Person"[^}]*?"description":"([^"]*)"/g)].map((m) => m[1])
    expect(new Set(descriptions).size).toBe(2)
  })
})

describe('home faq', () => {
  it('answers common questions visibly and in structured data', () => {
    const html = read('dist/index.html')
    expect(html).toContain('id="faq"')
    expect(html).toContain('"@type":"FAQPage"')
    expect(html).toContain('Faut-il parler anglais')
  })
})
