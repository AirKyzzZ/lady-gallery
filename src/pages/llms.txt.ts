import type { APIRoute } from 'astro'
import { ARTISTS, getDisplayName } from '../data/artists'
import { CATEGORIES } from '../data/taxonomy'
import { EVENT } from '../data/event'
import { getPath } from '../i18n/routes'

const SITE = 'https://lady-gallery.netlify.app'
const url = (path: string): string => `${SITE}${path}`

export const GET: APIRoute = () => {
  const sections = CATEGORIES.map((category) => {
    const lines = ARTISTS.filter((a) => a.category === category.key).map(
      (a) => `- ${getDisplayName(a)}: ${url(getPath('artist', 'en', a.slug))} (FR: ${url(getPath('artist', 'fr', a.slug))})`,
    )
    return `## ${category.label.en}\n\n${lines.join('\n')}`
  })

  const body = `# Lady Gallery

> An event by students of the STC department of Bordeaux Montaigne University, France, about English-speaking women artists: visual arts, literature, music, film and theatre, fashion. Free entry. The site is in French (default) and English.

Key facts: 45 women artists (43 pages, two of them duos), 5 rooms (visual arts, literature and poetry, music, film and theatre, fashion and design), 6 free workshops, free entry, organised by students of the STC department, Université Bordeaux Montaigne. Contact: Instagram ${EVENT.instagramHandle} (handle TBC).\n\nDate: ${EVENT.date.en}, ${EVENT.time.en}. Venue: ${EVENT.venue.en}, ${EVENT.address.en}, ${EVENT.city}.

## Main pages

- Home: ${url(getPath('home', 'en'))} (FR: ${url(getPath('home', 'fr'))})
- The arts, all artists: ${url(getPath('arts', 'en'))}
- Workshops: ${url(getPath('workshops', 'en'))}
- About: ${url(getPath('about', 'en'))}

${sections.join('\n\n')}

## Optional

- Image credits: ${url(getPath('credits', 'en'))}
- Partners: ${url(getPath('partners', 'en'))}
- Legal notice: ${url(getPath('legal', 'en'))}
- Terms of use: ${url(getPath('terms', 'en'))}
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
