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

  it('no longer flags the event facts as provisional', () => {
    const ticket = (path: string): string => read(path).match(/class="ticket[\s\S]*?<\/section>/)?.[0] ?? ''
    expect(ticket('dist/index.html')).toContain('hall de la CLEFF')
    expect(ticket('dist/index.html')).not.toContain('à confirmer')
    expect(ticket('dist/en/index.html')).toContain('CLEFF hall')
    expect(ticket('dist/en/index.html')).not.toContain('TBC')
  })

  it('shows the department line and both logos in the footer', () => {
    const home = read('dist/index.html')
    expect(home).toContain('13 étudiantes en L3 Information-Communication Anglais')
    expect(home).toContain('alt="Université Bordeaux Montaigne"')
    expect(home).toContain('alt="ISIC Bordeaux Montaigne"')
  })

  it('shows the event facts on the home page', () => {
    const home = read('dist/index.html')
    expect(home).toContain('1er décembre 2026')
    expect(home).toContain('11h – 13h30')
    expect(home).toContain('@ladygallery.event')
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

  it('uses plural wording on duo pages', () => {
    expect(read('dist/artistes/madonna-beyonce/index.html')).toContain('Pourquoi elles sont là')
    expect(read('dist/en/artists/madonna-beyonce/index.html')).toContain('Why they’re here')
    expect(read('dist/artistes/kate-bush/index.html')).toContain('Pourquoi elle est là')
  })

  it('lists every category artist on the category page', () => {
    const html = read('dist/arts/musique/index.html')
    expect(html).toMatch(/class="cartel[^"]*"[^>]*href="\/artistes\/aretha-franklin\/"|href="\/artistes\/aretha-franklin\/"[^>]*class="cartel/)
    expect(html.match(/class="cartel[ "]/g)).toHaveLength(11)
  })

  it('anchors each workshop', () => {
    const html = read('dist/ateliers/index.html')
    for (const id of ['bingo', 'memory', 'dobble', 'guess-who', 'reading', 'craft', 'snack']) expect(html).toContain(`id="${id}"`)
  })

  it('puts the new venue in the faq', () => {
    expect(read('dist/index.html').match(/hall de la CLEFF/g)?.length ?? 0).toBeGreaterThanOrEqual(2)
    expect(read('dist/en/index.html').match(/CLEFF hall/g)?.length ?? 0).toBeGreaterThanOrEqual(2)
  })

  it('names the publisher in the legal notice', () => {
    for (const path of ['dist/mentions-legales/index.html', 'dist/en/legal-notice/index.html']) {
      const html = read(path)
      expect(html).toContain('Oriane Poupard')
      expect(html).toContain('href="mailto:orianepoupard@icloud.com"')
    }
    expect(read('dist/mentions-legales/index.html')).not.toContain('à compléter')
    expect(read('dist/en/legal-notice/index.html')).not.toContain('to be added')
  })

  it('drops the provisional wording from the terms', () => {
    expect(read('dist/cgu/index.html')).not.toContain('à confirmer')
    expect(read('dist/en/terms/index.html')).not.toContain('TBC')
  })

  it('shows the three real posters', () => {
    const wall = (path: string): string => read(path).match(/class="poster-wall[\s\S]*?<\/section>/)?.[0] ?? ''
    const fr = wall('dist/index.html')
    expect(fr.match(/<img/g)).toHaveLength(3)
    expect(fr.match(/<a[^>]*href="\/_astro\/[^"]+\.webp"/g)).toHaveLength(3)
    for (const text of ['hall de la CLEFF', '12h45', '1er décembre']) expect(fr).toContain(text)
    expect(read('dist/index.html')).not.toContain('Affiche à venir')
    expect(read('dist/index.html')).not.toContain('en cours de dessin')
    const en = wall('dist/en/index.html')
    expect(en).toContain('CLEFF hall')
    expect(read('dist/en/index.html')).not.toContain('Poster coming soon')
  })

  it('lists the partners with their logos', () => {
    const urls = [
      'https://www.instagram.com/isic_rider/',
      'https://www.fnac.com',
      'https://www.canalbd.net/krazy-kat/',
      'https://www.booklovers.fr',
      'https://bordeaux.cinemas-utopia.org',
    ]
    const names = ['ISIC Rider', 'Fnac', 'Krazy Kat', 'Book Lovers', 'Utopia']
    const fr = read('dist/partenariats/index.html')
    for (const name of names) expect(fr).toContain(`alt="Logo ${name}"`)
    for (const url of urls) expect(fr).toContain(`href="${url}" rel="noopener"`)
    expect(fr).not.toContain('annoncés ici')
    const en = read('dist/en/partners/index.html')
    for (const name of names) expect(en).toContain(`alt="Logo ${name}"`)
    expect(en).not.toContain('announced here')
    expect(read('dist/credits/index.html')).toContain('Book Lovers')
  })

  it('shows the real workshop rules', () => {
    const fr = read('dist/ateliers/index.html')
    for (const text of ['parmi les 24 proposés', '5 × 5', 'pâte autodurcissante', '12 paires', '12h45', 'Pause gourmande', 'Atelier sculpture', 'Coin lecture'])
      expect(fr).toContain(text)
    for (const text of ['Lady !', 'seize artistes', 'collage', 'Les horaires de chaque atelier']) expect(fr).not.toContain(text)
    const en = read('dist/en/workshops/index.html')
    for (const text of ['out of the 24', '5 × 5', '12:45', 'Snack break']) expect(en).toContain(text)
    expect(en).not.toContain('collage')
  })

  it('links artists to the right workshop', () => {
    const bourgeois = read('dist/artistes/louise-bourgeois/index.html')
    expect(bourgeois).toContain('href="/ateliers/#craft"')
    expect(bourgeois).toContain('Atelier sculpture')
    expect(read('dist/artistes/cindy-sherman/index.html')).not.toContain('/ateliers/#')
    for (const slug of readdirSync('dist/artistes')) expect(read(`dist/artistes/${slug}/index.html`), slug).not.toContain('collage')
  })

  it('builds an english 404 page', () => {
    expect(existsSync('dist/en/404/index.html')).toBe(true)
    expect(read('dist/en/404/index.html')).toContain('lang="en"')
  })
})
