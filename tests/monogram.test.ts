import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import ArtistCard from '../src/components/artist-card.astro'
import ArtistFigure from '../src/components/artist-figure.astro'
import { getArtist, type Artist } from '../src/data/artists'

const withoutImage = (): Artist => {
  const { image: _image, ...rest } = getArtist('kate-bush')
  return rest
}

describe('monogram fallback', () => {
  it('renders a monogram and no image in the artist card', async () => {
    const container = await AstroContainer.create()
    const html = await container.renderToString(ArtistCard, { props: { artist: withoutImage(), locale: 'fr' } })
    expect(html).toContain('class="monogram')
    expect(html).toContain('KB')
    expect(html).not.toContain('<img')
  })

  it('renders a monogram without a credit line on the artist page figure', async () => {
    const container = await AstroContainer.create()
    const html = await container.renderToString(ArtistFigure, { props: { artist: withoutImage(), locale: 'en' } })
    expect(html).toContain('monogram--large')
    expect(html).not.toContain('<figcaption')
  })
})
