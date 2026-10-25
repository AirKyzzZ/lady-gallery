import type { Locale } from '../i18n/routes'
import type { CategoryKey, SubcategoryKey } from './taxonomy'
import facts from './artist-facts.json'

export type ArtistImage = {
  file: string
  alt: Record<Locale, string>
  author: string
  licence: string
  licenceUrl: string
  sourceUrl: string
  kind: 'portrait' | 'artwork'
}

export type Artist = {
  slug: string
  names: string[]
  category: CategoryKey
  subcategories: SubcategoryKey[]
  years: string
  nationality: Record<Locale, string>
  image?: ArtistImage
  sources: string[]
}

type ArtistFacts = Pick<Artist, 'years' | 'nationality' | 'image' | 'sources'>

type Entry = [slug: string, names: string[], category: CategoryKey, subcategories?: SubcategoryKey[]]

const ENTRIES: Entry[] = [
  ['georgia-okeeffe', ["Georgia O'Keeffe"], 'visual-arts', ['painting']],
  ['mary-cassatt', ['Mary Cassatt'], 'visual-arts', ['painting']],
  ['tracey-emin', ['Tracey Emin'], 'visual-arts', ['painting']],
  ['emily-carr', ['Emily Carr'], 'visual-arts', ['painting']],
  ['louise-bourgeois', ['Louise Bourgeois'], 'visual-arts', ['sculpture']],
  ['barbara-hepworth', ['Barbara Hepworth'], 'visual-arts', ['sculpture']],
  ['dorothea-lange', ['Dorothea Lange'], 'visual-arts', ['photography']],
  ['cindy-sherman', ['Cindy Sherman'], 'visual-arts', ['photography']],
  ['toni-morrison', ['Toni Morrison'], 'literature', ['fiction']],
  ['joan-didion', ['Joan Didion'], 'literature', ['fiction']],
  ['virginia-woolf', ['Virginia Woolf'], 'literature', ['fiction']],
  ['agatha-christie', ['Agatha Christie'], 'literature', ['fiction']],
  ['margaret-atwood', ['Margaret Atwood'], 'literature', ['fiction', 'poetry']],
  ['alice-munro', ['Alice Munro'], 'literature', ['fiction']],
  ['miles-franklin', ['Miles Franklin'], 'literature', ['fiction']],
  ['nadine-gordimer', ['Nadine Gordimer'], 'literature', ['fiction']],
  ['sylvia-plath', ['Sylvia Plath'], 'literature', ['poetry']],
  ['maya-angelou', ['Maya Angelou'], 'literature', ['poetry']],
  ['aretha-franklin', ['Aretha Franklin'], 'music'],
  ['billie-holiday-ella-fitzgerald', ['Billie Holiday', 'Ella Fitzgerald'], 'music'],
  ['patti-smith', ['Patti Smith'], 'music'],
  ['madonna-beyonce', ['Madonna', 'Beyoncé'], 'music'],
  ['amy-winehouse', ['Amy Winehouse'], 'music'],
  ['kate-bush', ['Kate Bush'], 'music'],
  ['adele', ['Adele'], 'music'],
  ['joni-mitchell', ['Joni Mitchell'], 'music'],
  ['alanis-morissette', ['Alanis Morissette'], 'music'],
  ['lorde', ['Lorde'], 'music'],
  ['rihanna', ['Rihanna'], 'music'],
  ['meryl-streep', ['Meryl Streep'], 'film'],
  ['katharine-hepburn', ['Katharine Hepburn'], 'film'],
  ['greta-gerwig', ['Greta Gerwig'], 'film'],
  ['kathryn-bigelow', ['Kathryn Bigelow'], 'film'],
  ['judi-dench', ['Judi Dench'], 'film'],
  ['maggie-smith', ['Maggie Smith'], 'film'],
  ['cate-blanchett', ['Cate Blanchett'], 'film'],
  ['nicole-kidman', ['Nicole Kidman'], 'film'],
  ['jane-campion', ['Jane Campion'], 'film'],
  ['vivienne-westwood', ['Vivienne Westwood'], 'fashion'],
  ['mary-quant', ['Mary Quant'], 'fashion'],
  ['stella-mccartney', ['Stella McCartney'], 'fashion'],
  ['vera-wang', ['Vera Wang'], 'fashion'],
  ['claire-mccardell', ['Claire McCardell'], 'fashion'],
]

const FACTS: Partial<Record<string, ArtistFacts>> = facts

const EMPTY_FACTS: ArtistFacts = { years: '', nationality: { fr: '', en: '' }, sources: [] }

export const ARTISTS: readonly Artist[] = ENTRIES.map(([slug, names, category, subcategories = []]) => ({
  slug,
  names,
  category,
  subcategories,
  ...(FACTS[slug] ?? EMPTY_FACTS),
}))

export const getArtist = (slug: string): Artist => {
  const artist = ARTISTS.find((a) => a.slug === slug)
  if (!artist) throw new Error(`Unknown artist: ${slug}`)
  return artist
}

export const getArtistsByCategory = (key: CategoryKey): Artist[] => ARTISTS.filter((a) => a.category === key)

export const getNeighbours = (slug: string): { prev?: Artist; next?: Artist } => {
  const siblings = getArtistsByCategory(getArtist(slug).category)
  const index = siblings.findIndex((a) => a.slug === slug)
  return { prev: siblings[index - 1], next: siblings[index + 1] }
}

export const getDisplayName = (artist: Artist): string => artist.names.join(' & ')
