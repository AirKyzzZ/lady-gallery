import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { ARTISTS, getArtist, getArtistsByCategory, getNeighbours } from '../src/data/artists'
import { CATEGORIES } from '../src/data/taxonomy'
import { LOCALES } from '../src/i18n/routes'

describe('artist registry', () => {
  it('lists 43 unique artist pages', () => {
    expect(ARTISTS).toHaveLength(43)
    expect(new Set(ARTISTS.map((a) => a.slug)).size).toBe(43)
  })

  it('keeps margaret atwood once under fiction and poetry', () => {
    expect(getArtist('margaret-atwood').subcategories).toEqual(['fiction', 'poetry'])
  })

  it('models duos as one page with two names', () => {
    expect(getArtist('madonna-beyonce').names).toEqual(['Madonna', 'Beyoncé'])
  })

  it('keeps spec order inside a category', () => {
    expect(getArtistsByCategory('music').map((a) => a.slug)[0]).toBe('aretha-franklin')
  })

  it('only uses subcategories declared by the category', () => {
    for (const artist of ARTISTS) {
      const category = CATEGORIES.find((c) => c.key === artist.category)
      for (const sub of artist.subcategories) expect(category?.subcategories ?? []).toContain(sub)
    }
  })

  it('throws with the slug for unknown artists', () => {
    expect(() => getArtist('nope')).toThrow(/nope/)
  })

  it('returns neighbours within the category only', () => {
    expect(getNeighbours('aretha-franklin').prev).toBeUndefined()
    expect(getNeighbours('aretha-franklin').next?.slug).toBe('billie-holiday-ella-fitzgerald')
    expect(getNeighbours('cindy-sherman').next).toBeUndefined()
  })

  it('has a bio file per artist in every locale', () => {
    for (const artist of ARTISTS)
      for (const locale of LOCALES)
        expect(existsSync(`src/content/bios/${locale}/${artist.slug}.md`), `${locale}/${artist.slug}`).toBe(true)
  })
})
