import type { Locale } from '../i18n/routes'

export type WorkshopKey = 'bingo' | 'memory' | 'dobble' | 'guess-who' | 'reading' | 'craft'

type Localised = Record<Locale, string>

export const EVENT = {
  isPlaceholder: true,
  startDate: '2027-03-25T14:00:00+01:00',
  endDate: '2027-03-25T20:00:00+01:00',
  date: { fr: 'Printemps 2027', en: 'Spring 2027' } satisfies Localised,
  time: { fr: '14h – 20h', en: '2pm – 8pm' } satisfies Localised,
  venue: { fr: 'Université de Bordeaux', en: 'University of Bordeaux' } satisfies Localised,
  address: { fr: 'Campus Victoire, Bordeaux', en: 'Victoire campus, Bordeaux' } satisfies Localised,
  streetAddress: '3 ter place de la Victoire',
  postalCode: '33000',
  city: 'Bordeaux',
  price: { fr: 'Entrée libre', en: 'Free entry' } satisfies Localised,
  instagramHandle: '@ladygallery',
  instagramUrl: 'https://www.instagram.com/ladygallery/',
  tiktokUrl: 'https://www.tiktok.com/@ladygallery',
} as const

export const WORKSHOPS: readonly { key: WorkshopKey; title: Localised }[] = [
  { key: 'bingo', title: { fr: 'Bingo musical', en: 'Music bingo' } },
  { key: 'memory', title: { fr: 'Memory des peintres', en: 'Painters memory' } },
  { key: 'dobble', title: { fr: 'Dobble mode', en: 'Fashion Dobble' } },
  { key: 'guess-who', title: { fr: 'Qui est-ce ? ciné', en: 'Guess Who? film edition' } },
  { key: 'reading', title: { fr: 'Stand lecture', en: 'Reading corner' } },
  { key: 'craft', title: { fr: 'Atelier manuel', en: 'Craft workshop' } },
]
