import { describe, expect, it } from 'vitest'
import { getAlternatePath, getPath } from '../src/i18n/routes'

describe('getPath', () => {
  it('builds unprefixed french and prefixed english paths', () => {
    expect(getPath('home', 'fr')).toBe('/')
    expect(getPath('home', 'en')).toBe('/en/')
    expect(getPath('workshops', 'en')).toBe('/en/workshops/')
    expect(getPath('artist', 'fr', 'kate-bush')).toBe('/artistes/kate-bush/')
  })
})

describe('getAlternatePath', () => {
  it('maps a page to the same page in the other locale', () => {
    expect(getAlternatePath('/artistes/kate-bush/', 'en')).toBe('/en/artists/kate-bush/')
    expect(getAlternatePath('/en/legal-notice/', 'fr')).toBe('/mentions-legales/')
  })

  it('falls back to the home page for unknown paths', () => {
    expect(getAlternatePath('/unknown/', 'en')).toBe('/en/')
  })
})
