import { describe, expect, it } from 'vitest'
import { getArtist } from '../src/data/artists'
import { personNodes } from '../src/lib/structured-data'

describe('person structured data', () => {
  it('keeps each duo member linked only to her own wikipedia pages', () => {
    const [billie, ella] = personNodes(getArtist('billie-holiday-ella-fitzgerald'), 'en', 'desc', 'https://x/img.jpg')
    expect(billie?.sameAs).toEqual(expect.arrayContaining([expect.stringMatching(/Billie_Holiday/)]))
    expect(billie?.sameAs).not.toEqual(expect.arrayContaining([expect.stringMatching(/Ella_Fitzgerald/)]))
    expect(ella?.sameAs).not.toEqual(expect.arrayContaining([expect.stringMatching(/Billie_Holiday/)]))
  })

  it('attaches the image only to the first duo member', () => {
    const [first, second] = personNodes(getArtist('madonna-beyonce'), 'fr', 'desc', 'https://x/img.jpg')
    expect(first?.image).toBe('https://x/img.jpg')
    expect(second?.image).toBeUndefined()
  })
})
