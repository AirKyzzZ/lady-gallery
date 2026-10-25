import { describe, expect, it } from 'vitest'
import { splitFrenchWorkTitle } from '../src/lib/work-title'

describe('splitFrenchWorkTitle', () => {
  it('marks an untranslated title as english', () => {
    expect(splitFrenchWorkTitle('Wuthering Heights', ['Wuthering Heights'])).toEqual([{ text: 'Wuthering Heights', lang: 'en' }])
  })

  it('splits an english title from its french translation', () => {
    expect(splitFrenchWorkTitle('The Bell Jar (La Cloche de détresse)', ['The Bell Jar'])).toEqual([
      { text: 'The Bell Jar', lang: 'en' },
      { text: ' (La Cloche de détresse)' },
    ])
  })

  it('leaves a french-only title in the page language', () => {
    expect(splitFrenchWorkTitle('Minijupe', ['Miniskirt'])).toEqual([{ text: 'Minijupe' }])
  })
})
