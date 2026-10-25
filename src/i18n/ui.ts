import type { Locale } from './routes'

const UI = {
  fr: {
    'site.name': 'Lady Gallery',
    'site.tagline': 'Women just wanna make, create, shape it.',
    'site.skip': 'Aller au contenu',
    'lang.switch': 'EN',
    'lang.switchLabel': 'Read this page in English',
    'nav.label': 'Navigation principale',
    'nav.menu': 'Menu',
    'nav.arts': 'Les arts',
    'nav.artsAll': 'Toutes les artistes',
    'nav.workshops': 'Ateliers',
    'nav.partners': 'Partenariats',
    'nav.about': 'À propos',
    'nav.home': 'Accueil Lady Gallery',
    'footer.project': 'Un projet étudiant du département de langues de l’Université de Bordeaux.',
    'footer.follow': 'Nous suivre',
    'footer.legal': 'Mentions légales',
    'footer.terms': 'CGU',
    'footer.credits': 'Crédits photo',
    'footer.noCookies': 'Ce site ne dépose aucun cookie.',
    'footer.handleTbc': 'compte à confirmer',
    'tbc': 'à confirmer',
  },
  en: {
    'site.name': 'Lady Gallery',
    'site.tagline': 'Women just wanna make, create, shape it.',
    'site.skip': 'Skip to content',
    'lang.switch': 'FR',
    'lang.switchLabel': 'Lire cette page en français',
    'nav.label': 'Main navigation',
    'nav.menu': 'Menu',
    'nav.arts': 'The arts',
    'nav.artsAll': 'All the artists',
    'nav.workshops': 'Workshops',
    'nav.partners': 'Partners',
    'nav.about': 'About',
    'nav.home': 'Lady Gallery home',
    'footer.project': 'A student project from the language department of the University of Bordeaux.',
    'footer.follow': 'Follow us',
    'footer.legal': 'Legal notice',
    'footer.terms': 'Terms of use',
    'footer.credits': 'Image credits',
    'footer.noCookies': 'This site sets no cookies.',
    'footer.handleTbc': 'account TBC',
    'tbc': 'TBC',
  },
} as const satisfies Record<Locale, Record<string, string>>

export type UiKey = keyof (typeof UI)['fr']

export const t = (locale: Locale, key: UiKey): string => UI[locale][key]
