import type { CategoryKey } from '../data/taxonomy'
import type { Locale } from './routes'

export const WORKS_TITLE: Record<CategoryKey, Record<Locale, string>> = {
  'visual-arts': { fr: 'À voir', en: 'Go and see' },
  literature: { fr: 'À lire', en: 'Read' },
  music: { fr: 'À écouter', en: 'Listen' },
  film: { fr: 'À voir', en: 'Watch' },
  fashion: { fr: 'À regarder de près', en: 'Look closely' },
}

export const ARTIST_COPY: Record<
  Locale,
  {
    whyHere: string
    workshopLink: (title: string) => string
    previous: string
    next: string
    imageBy: string
    portrait: string
    artwork: string
  }
> = {
  fr: {
    whyHere: 'Pourquoi elle est là',
    workshopLink: (title) => `La retrouver à l’atelier ${title}`,
    previous: 'Précédente',
    next: 'Suivante',
    imageBy: 'Image',
    portrait: 'Portrait',
    artwork: 'Œuvre',
  },
  en: {
    whyHere: 'Why she’s here',
    workshopLink: (title) => `Find her at the ${title} workshop`,
    previous: 'Previous',
    next: 'Next',
    imageBy: 'Image',
    portrait: 'Portrait',
    artwork: 'Artwork',
  },
}

