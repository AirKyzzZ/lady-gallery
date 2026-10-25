import type { Locale } from '../i18n/routes'

export type CategoryKey = 'visual-arts' | 'literature' | 'music' | 'film' | 'fashion'
export type SubcategoryKey = 'painting' | 'sculpture' | 'photography' | 'fiction' | 'poetry'
export type PictogramName = 'music' | 'literature' | 'visual-arts' | 'film' | 'fashion'

export type Category = {
  key: CategoryKey
  slug: Record<Locale, string>
  label: Record<Locale, string>
  pictogram: PictogramName
  subcategories?: SubcategoryKey[]
}

export const CATEGORIES: readonly Category[] = [
  {
    key: 'visual-arts',
    slug: { fr: 'arts-visuels', en: 'visual-arts' },
    label: { fr: 'Arts visuels', en: 'Visual arts' },
    pictogram: 'visual-arts',
    subcategories: ['painting', 'sculpture', 'photography'],
  },
  {
    key: 'literature',
    slug: { fr: 'litterature-poesie', en: 'literature-poetry' },
    label: { fr: 'Littérature & poésie', en: 'Literature & poetry' },
    pictogram: 'literature',
    subcategories: ['fiction', 'poetry'],
  },
  {
    key: 'music',
    slug: { fr: 'musique', en: 'music' },
    label: { fr: 'Musique', en: 'Music' },
    pictogram: 'music',
  },
  {
    key: 'film',
    slug: { fr: 'cinema-theatre', en: 'film-theatre' },
    label: { fr: 'Cinéma & théâtre', en: 'Film & theatre' },
    pictogram: 'film',
  },
  {
    key: 'fashion',
    slug: { fr: 'mode-design', en: 'fashion-design' },
    label: { fr: 'Mode & design', en: 'Fashion & design' },
    pictogram: 'fashion',
  },
]

export const SUBCATEGORY_LABELS: Record<SubcategoryKey, Record<Locale, string>> = {
  painting: { fr: 'Peinture', en: 'Painting' },
  sculpture: { fr: 'Sculpture', en: 'Sculpture' },
  photography: { fr: 'Photographie', en: 'Photography' },
  fiction: { fr: 'Romans & nouvelles', en: 'Novels & short stories' },
  poetry: { fr: 'Poésie', en: 'Poetry' },
}

export const getCategory = (key: CategoryKey): Category => {
  const category = CATEGORIES.find((c) => c.key === key)
  if (!category) throw new Error(`Unknown category: ${key}`)
  return category
}

export const findCategoryBySlug = (slug: string, locale: Locale): Category | undefined =>
  CATEGORIES.find((c) => c.slug[locale] === slug)
