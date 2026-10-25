import { CATEGORIES, type CategoryKey } from '../data/taxonomy'

export const LOCALES = ['fr', 'en'] as const
export type Locale = (typeof LOCALES)[number]

export type RouteKey =
  | 'home'
  | 'arts'
  | 'category'
  | 'artist'
  | 'workshops'
  | 'partners'
  | 'about'
  | 'legal'
  | 'terms'
  | 'credits'

const SEGMENTS: Record<RouteKey, Record<Locale, string>> = {
  home: { fr: '', en: '' },
  arts: { fr: 'arts', en: 'arts' },
  category: { fr: 'arts', en: 'arts' },
  artist: { fr: 'artistes', en: 'artists' },
  workshops: { fr: 'ateliers', en: 'workshops' },
  partners: { fr: 'partenariats', en: 'partners' },
  about: { fr: 'a-propos', en: 'about' },
  legal: { fr: 'mentions-legales', en: 'legal-notice' },
  terms: { fr: 'cgu', en: 'terms' },
  credits: { fr: 'credits', en: 'credits' },
}

const PARAM_ROUTES: ReadonlySet<RouteKey> = new Set(['category', 'artist'])

const localePrefix = (locale: Locale): string => (locale === 'fr' ? '' : `/${locale}`)

const localiseParam = (key: RouteKey, locale: Locale, param?: string): string | undefined => {
  if (key !== 'category' || !param) return param
  return CATEGORIES.find((c) => c.key === param)?.slug[locale] ?? param
}

const categoryKeyFromSlug = (slug: string, locale: Locale): CategoryKey | undefined =>
  CATEGORIES.find((c) => c.slug[locale] === slug)?.key

export const getPath = (key: RouteKey, locale: Locale, param?: string): string => {
  const parts = [SEGMENTS[key][locale], localiseParam(key, locale, param)].filter((part): part is string => Boolean(part))
  const path = parts.length ? `/${parts.join('/')}/` : '/'
  return `${localePrefix(locale)}${path}`
}

type ParsedRoute = { key: RouteKey; param?: string }

const parsePath = (pathname: string): { locale: Locale; route?: ParsedRoute } => {
  const segments = pathname.split('/').filter(Boolean)
  const locale: Locale = segments[0] === 'en' ? 'en' : 'fr'
  const rest = locale === 'en' ? segments.slice(1) : segments
  if (rest.length === 0) return { locale, route: { key: 'home' } }

  const [first, second] = rest
  const keys = Object.keys(SEGMENTS) as RouteKey[]
  const key = keys.find(
    (candidate) =>
      SEGMENTS[candidate][locale] === first && PARAM_ROUTES.has(candidate) === Boolean(second),
  )
  if (!key || rest.length > 2) return { locale }
  if (!second) return { locale, route: { key } }
  if (key !== 'category') return { locale, route: { key, param: second } }
  const categoryKey = categoryKeyFromSlug(second, locale)
  return categoryKey ? { locale, route: { key, param: categoryKey } } : { locale }
}

export const getAlternatePath = (pathname: string, target: Locale): string => {
  const { route } = parsePath(pathname)
  if (!route) return getPath('home', target)
  return getPath(route.key, target, route.param)
}
