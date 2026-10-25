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

export const getPath = (key: RouteKey, locale: Locale, param?: string): string => {
  const parts = [SEGMENTS[key][locale], param].filter((part): part is string => Boolean(part))
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
  return { locale, route: second ? { key, param: second } : { key } }
}

export const getAlternatePath = (pathname: string, target: Locale): string => {
  const { route } = parsePath(pathname)
  if (!route) return getPath('home', target)
  return getPath(route.key, target, route.param)
}
