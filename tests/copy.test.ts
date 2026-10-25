import { readFileSync, readdirSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { ARTISTS } from '../src/data/artists'
import { LOCALES } from '../src/i18n/routes'

const BANNED =
  /\b(trailblaz\w*|iconic|iconique|timeless|intemporel\w*|testament to|shattered|pioneering|tapestry|delve\w*|vibrant\w*|incontournable\w*|legendary|légendaire\w*|véritable icône|true icon|pushed boundaries|repoussé les limites)\b/i
const EM_DASH = /—/

const bodyOf = (markdown: string): string => markdown.split('---').slice(2).join('---')

describe('artist bios', () => {
  it('have every fact filled in', () => {
    for (const artist of ARTISTS) {
      expect(artist.years, artist.slug).not.toBe('')
      expect(artist.nationality.fr, artist.slug).not.toBe('')
      expect(artist.sources.length, artist.slug).toBeGreaterThanOrEqual(2)
    }
  })

  it('stay between 180 and 300 words without banned wording or em dashes', () => {
    for (const artist of ARTISTS)
      for (const locale of LOCALES) {
        const body = bodyOf(readFileSync(`src/content/bios/${locale}/${artist.slug}.md`, 'utf8'))
        const words = body.trim().split(/\s+/).length
        const label = `${locale}/${artist.slug}`
        expect(words, label).toBeGreaterThanOrEqual(180)
        expect(words, label).toBeLessThanOrEqual(300)
        expect(body, label).not.toMatch(BANNED)
        expect(body, label).not.toMatch(EM_DASH)
        expect(body, label).not.toMatch(/lorem/i)
      }
  })
})

describe('page copy', () => {
  const files = [
    ...readdirSync('src/i18n').map((name) => `src/i18n/${name}`),
    ...readdirSync('src/views').map((name) => `src/views/${name}`),
    'src/data/event.ts',
  ]

  it('avoids banned wording and em dashes', () => {
    for (const file of files) {
      const text = readFileSync(file, 'utf8')
      expect(text, file).not.toMatch(BANNED)
      expect(text, file).not.toMatch(EM_DASH)
    }
  })
})
