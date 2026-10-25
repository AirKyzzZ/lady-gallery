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

> A one-day event by students of the language department of the University of Bordeaux, France, about English-speaking women artists: visual arts, literature, music, film and theatre, fashion. Free entry. The site is in French (default) and English.

Event date, time and venue are provisional (${EVENT.date.en}, ${EVENT.time.en}, ${EVENT.venue.en}) and marked TBC on the site.

## Main pages

- Home: ${url(getPath('home', 'en'))} (FR: ${url(getPath('home', 'fr'))})
- The arts, all artists: ${url(getPath('arts', 'en'))}
- Workshops: ${url(getPath('workshops', 'en'))}
- About: ${url(getPath('about', 'en'))}
- Image credits: ${url(getPath('credits', 'en'))}

${sections.join('\n\n')}
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
