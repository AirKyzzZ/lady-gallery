import type { Locale } from '../i18n/routes'

export type WorkshopKey = 'bingo' | 'memory' | 'dobble' | 'guess-who' | 'reading' | 'craft'

type Localised = Record<Locale, string>

export const EVENT = {
  isPlaceholder: false,
  startDate: '2026-12-01T11:00:00+01:00',
  endDate: '2026-12-01T13:30:00+01:00',
  date: { fr: '1er décembre 2026', en: '1 December 2026' } satisfies Localised,
  time: { fr: '11h – 13h30', en: '11am – 1:30pm' } satisfies Localised,
  venue: { fr: 'Université Bordeaux Montaigne', en: 'Bordeaux Montaigne University' } satisfies Localised,
  address: { fr: 'hall de l’amphi A700', en: 'hall of lecture theatre A700' } satisfies Localised,
  streetAddress: 'Esplanade des Antilles',
  postalCode: '33607',
  city: 'Pessac',
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
