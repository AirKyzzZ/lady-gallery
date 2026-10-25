import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { ARTISTS } from '../src/data/artists'

const read = (path: string): string => readFileSync(path, 'utf8')

describe('pages', () => {
  it('builds every artist page in both locales', () => {
    expect(readdirSync('dist/artistes')).toHaveLength(43)
    expect(readdirSync('dist/en/artists')).toHaveLength(43)
    expect(existsSync('dist/en/artists/billie-holiday-ella-fitzgerald/index.html')).toBe(true)
  })

  it('flags placeholder event facts on both home pages', () => {
    expect(read('dist/index.html')).toMatch(/class="ticket[\s\S]*?à confirmer/)
    expect(read('dist/en/index.html')).toMatch(/class="ticket[\s\S]*?TBC/)
  })

  it('shows the event facts on the home page', () => {
    const home = read('dist/index.html')
    expect(home).toContain('Jeudi 25 mars 2027')
    expect(home).toContain('@ladygallery')
  })

  it('renders a monogram when an artist has no safe image', () => {
    const withoutImage = ARTISTS.filter((a) => !a.image)
    for (const artist of withoutImage)
      expect(read(`dist/artistes/${artist.slug}/index.html`)).toContain('class="monogram')
  })

  it('renders a credited figure when an artist has an image', () => {
    const withImage = ARTISTS.find((a) => a.image)
    if (!withImage?.image) return
    const html = read(`dist/artistes/${withImage.slug}/index.html`)
    expect(html).toContain(withImage.image.licence)
    expect(html).toContain(withImage.image.sourceUrl)
  })

  it('prints duo names on separate lines', () => {
    const html = read('dist/artistes/madonna-beyonce/index.html')
    expect(html).toMatch(/<h1[^>]*>[\s\S]*Madonna[\s\S]*<br[\s\S]*Beyoncé[\s\S]*<\/h1>/)
  })

  it('lists every category artist on the category page', () => {
    const html = read('dist/arts/musique/index.html')
    expect(html).toMatch(/class="cartel[^"]*"[^>]*href="\/artistes\/aretha-franklin\/"|href="\/artistes\/aretha-franklin\/"[^>]*class="cartel/)
    expect(html.match(/class="cartel[ "]/g)).toHaveLength(11)
  })

  it('anchors each workshop', () => {
    const html = read('dist/ateliers/index.html')
    for (const id of ['bingo', 'memory', 'dobble', 'guess-who', 'reading', 'craft']) expect(html).toContain(`id="${id}"`)
  })

  it('builds an english 404 page', () => {
    expect(existsSync('dist/en/404/index.html')).toBe(true)
    expect(read('dist/en/404/index.html')).toContain('lang="en"')
  })
})
