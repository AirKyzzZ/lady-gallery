import type { Locale } from './routes'

const UI = {
  fr: {
    'site.name': 'Lady Gallery',
    'site.tagline': 'Women just wanna make, create, shape it.',
    'site.skip': 'Aller au contenu',
    'lang.switch': 'English',
    'lang.switchLabel': 'Read this page in English',
  },
  en: {
    'site.name': 'Lady Gallery',
    'site.tagline': 'Women just wanna make, create, shape it.',
    'site.skip': 'Skip to content',
    'lang.switch': 'Français',
    'lang.switchLabel': 'Lire cette page en français',
  },
} as const satisfies Record<Locale, Record<string, string>>

export type UiKey = keyof (typeof UI)['fr']

export const t = (locale: Locale, key: UiKey): string => UI[locale][key]
