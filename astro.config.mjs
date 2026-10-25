import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import { getAlternatePath } from './src/i18n/routes.ts'

const SITE = 'https://lady-gallery.netlify.app'

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize: (item) => {
        const { pathname } = new URL(item.url)
        const fr = pathname.startsWith('/en/') ? getAlternatePath(pathname, 'fr') : pathname
        const en = pathname.startsWith('/en/') ? pathname : getAlternatePath(pathname, 'en')
        return {
          ...item,
          links: [
            { lang: 'fr', url: `${SITE}${fr}` },
            { lang: 'en', url: `${SITE}${en}` },
            { lang: 'x-default', url: `${SITE}${fr}` },
          ],
        }
      },
    }),
  ],
})
