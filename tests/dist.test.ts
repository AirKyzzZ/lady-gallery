import { existsSync, readFileSync } from 'node:fs'
import { beforeAll, describe, expect, it } from 'vitest'
import { checkDistLinks } from '../scripts/check-dist-links'

const read = (path: string): string => readFileSync(path, 'utf8')

describe('built site', () => {
  beforeAll(() => {
    if (!existsSync('dist/index.html')) throw new Error('Run npm run build before the dist tests')
  })

  it('has no broken internal links', () => {
    expect(checkDistLinks('dist')).toEqual([])
  })

  it('links the language toggle to the same artist in english', () => {
    expect(read('dist/artistes/kate-bush/index.html')).toContain('href="/en/artists/kate-bush/"')
  })

  it('renders the arts menu as a no-js disclosure', () => {
    expect(read('dist/index.html')).toMatch(/<details[^>]*class="[^"]*nav-arts/)
  })
})
