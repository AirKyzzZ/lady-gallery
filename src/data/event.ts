import type { Locale } from '../i18n/routes'
import type { CategoryKey } from './taxonomy'

export type WorkshopKey = 'guess-who' | 'dobble' | 'memory' | 'reading' | 'craft' | 'snack' | 'bingo'
export type WorkshopGroup = 'games' | 'stands' | 'slot'

type Localised = Record<Locale, string>

export const EVENT = {
  isPlaceholder: false,
  startDate: '2026-12-01T11:00:00+01:00',
  endDate: '2026-12-01T13:30:00+01:00',
  date: { fr: '1er décembre 2026', en: '1 December 2026' } satisfies Localised,
  time: { fr: '11h – 13h30', en: '11am – 1:30pm' } satisfies Localised,
  venue: { fr: 'Université Bordeaux Montaigne', en: 'Bordeaux Montaigne University' } satisfies Localised,
  address: { fr: 'hall de la CLEFF', en: 'CLEFF hall' } satisfies Localised,
  streetAddress: 'Esplanade des Antilles',
  postalCode: '33607',
  city: 'Pessac',
  price: { fr: 'Entrée libre', en: 'Free entry' } satisfies Localised,
  instagramHandle: '@ladygallery.event',
  instagramUrl: 'https://www.instagram.com/ladygallery.event/',
} as const

export const WORKSHOP_GROUPS: readonly WorkshopGroup[] = ['games', 'stands', 'slot']

export const WORKSHOPS: readonly { key: WorkshopKey; group: WorkshopGroup; category?: CategoryKey; title: Localised }[] = [
  { key: 'guess-who', group: 'games', category: 'film', title: { fr: 'Qui est-ce ?', en: 'Who’s This?' } },
  { key: 'dobble', group: 'games', category: 'fashion', title: { fr: 'Dobble', en: 'Dobble' } },
  { key: 'memory', group: 'games', category: 'visual-arts', title: { fr: 'Memory', en: 'Memory' } },
  { key: 'reading', group: 'stands', category: 'literature', title: { fr: 'Coin lecture', en: 'Reading corner' } },
  { key: 'craft', group: 'stands', category: 'visual-arts', title: { fr: 'Atelier sculpture', en: 'Sculpture workshop' } },
  { key: 'snack', group: 'stands', title: { fr: 'Pause gourmande', en: 'Snack break' } },
  { key: 'bingo', group: 'slot', category: 'music', title: { fr: 'Bingo musical', en: 'Music bingo' } },
]
