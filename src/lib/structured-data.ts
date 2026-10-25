import type { Artist } from '../data/artists'
import { EVENT } from '../data/event'
import { getCategory } from '../data/taxonomy'
import { getPath, type Locale } from '../i18n/routes'
import { t } from '../i18n/ui'

const SITE = 'https://lady-gallery.netlify.app'
const url = (path: string): string => new URL(path, SITE).href

export const organizationNode = (): Record<string, unknown> => ({
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'Lady Gallery',
  url: SITE,
  logo: url('/favicon.svg'),
  sameAs: [EVENT.instagramUrl],
  parentOrganization: { '@type': 'CollegeOrUniversity', name: 'Université de Bordeaux', url: 'https://www.u-bordeaux.fr' },
})

export const eventNode = (locale: Locale, description: string): Record<string, unknown> => ({
  '@type': 'Event',
  name: 'Lady Gallery',
  description,
  startDate: EVENT.startDate,
  endDate: EVENT.endDate,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  isAccessibleForFree: true,
  inLanguage: ['fr', 'en'],
  image: url('/og-default.png'),
  url: url(getPath('home', locale)),
  location: {
    '@type': 'Place',
    name: EVENT.venue[locale],
    address: {
      '@type': 'PostalAddress',
      streetAddress: EVENT.streetAddress,
      postalCode: EVENT.postalCode,
      addressLocality: EVENT.city,
      addressCountry: 'FR',
    },
  },
  organizer: { '@id': `${SITE}/#organization` },
  offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR', availability: 'https://schema.org/InStock', url: url(getPath('home', locale)) },
})

const isOwnWikipediaPage = (source: string, name: string, isDuo: boolean): boolean =>
  source.includes('wikipedia.org') && (!isDuo || decodeURI(source).includes(name.replace(/ /g, '_')))

export const personNodes = (artist: Artist, locale: Locale, description: string, imageUrl?: string): Record<string, unknown>[] => {
  const isDuo = artist.names.length > 1
  return artist.names.map((name, index) => ({
    '@type': 'Person',
    name,
    description,
    nationality: isDuo ? undefined : artist.nationality[locale] || undefined,
    image: index === 0 ? imageUrl : undefined,
    sameAs: artist.sources.filter((source) => isOwnWikipediaPage(source, name, isDuo)),
    url: url(getPath('artist', locale, artist.slug)),
  }))
}

export const breadcrumbNode = (locale: Locale, artist: Artist, name: string): Record<string, unknown> => {
  const category = getCategory(artist.category)
  const items = [
    { name: t(locale, 'nav.arts'), item: url(getPath('arts', locale)) },
    { name: category.label[locale], item: url(getPath('category', locale, category.key)) },
    { name, item: url(getPath('artist', locale, artist.slug)) },
  ]
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, ...item })),
  }
}
