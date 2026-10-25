import { describe, expect, it } from 'vitest'
import { formatYears } from '../src/lib/artist-images'

describe('formatYears', () => {
  it('localises a living artist', () => {
    expect(formatYears('b. 1958', 'fr')).toBe('née en 1958')
    expect(formatYears('b. 1958', 'en')).toBe('born 1958')
  })

  it('localises each member of a duo', () => {
    expect(formatYears('b. 1958 · b. 1981', 'fr')).toBe('née en 1958 et née en 1981')
    expect(formatYears('1915–1959 · 1917–1996', 'en')).toBe('1915–1959 and 1917–1996')
  })
})
