# Lady Gallery site v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a bilingual (FR default, EN) static event site for Lady Gallery with 43 artist pages, deployed on `lady-gallery.netlify.app` from a public GitHub repo, scoring 4×100 on Lighthouse mobile.

**Architecture:** Astro static output. Non-localised artist facts live in a typed registry (`src/data/artists.ts`); localised bios live in a content collection (`src/content/bios/{fr,en}/<slug>.md`). Every route exists in both locales through a single route map in `src/i18n/routes.ts`; FR pages sit at the root, EN pages under `/en/`, both thin wrappers over shared view components in `src/views/`.

**Tech Stack:** Astro 5, TypeScript strict, Vitest, `@astrojs/sitemap`, `@astrojs/check`, Fontsource (`@fontsource/poiret-one`, `@fontsource-variable/outfit`), Netlify, Node 22.

**Spec:** `docs/superpowers/specs/2026-10-25-lady-gallery-site-design.md`

## Global Constraints

- Colours: bg `#F3EBE0`, surface beige `#BEA787`, ink/navy `#292F43`, accent red `#9D160D`, secondary ochre `#DF9E3F` (decorative only, never text on cream), sage `#8E977A`, slate `#59697C`. WCAG AA contrast for all text.
- Fonts: Poiret One for display ≥ 1.75rem only; Outfit for everything else. Self-hosted, latin + latin-ext subsets, `font-display: swap`.
- Locales: `fr` default unprefixed, `en` under `/en/`. Every page and every artist exists in both, missing translation fails the build.
- No client framework, no analytics, no cookies, works without JS.
- Placeholder event facts carry a visible "à confirmer" / "TBC" marker.
- Images only from Wikimedia Commons (licences: Public domain, CC0, CC BY, CC BY-SA) or Unsplash; every image credited. No artwork reproductions for artists still under copyright.
- Copy: no AI-slop vocabulary (trailblazer, iconic, timeless, testament, shattered, pioneering, legacy-as-filler, "not just X but Y"), no em dashes in copy, no invented facts or quotes.
- Code: TS strict, kebab-case files, named exports, zero comments, no `any`.
- Commits: conventional, subject only.
- Lighthouse mobile 100/100/100/100 on `/`, `/arts/musique/`, `/artistes/kate-bush/`.

## Review Focus

1. Language toggle on an artist or category page must land on the same artist/category in the other locale, not the home page. (Test in Task 3.)
2. Nav must work with keyboard and without JS, and on a 360px-wide screen (dropdown and mobile menu). (Test in Task 4.)
3. An artist with no safe image renders the monogram fallback, with no broken `<img>` and no `og:image` pointing at a missing file. (Test in Task 5.)
4. Duo pages ("Billie Holiday & Ella Fitzgerald", "Madonna & Beyoncé") and long names must not overflow on mobile; duo pages emit two `Person` entities. (Tests in Tasks 5 and 6.)
5. Every internal link in `dist/` resolves to a built file, in both locales, including the EN 404. (Test in Task 4, re-run in Task 10.)

---

## File Structure

```
astro.config.mjs            i18n, sitemap, site URL
netlify.toml                build, Node 22, headers, cache
.nvmrc                      22
src/styles/tokens.css       colours, type scale, spacing
src/styles/global.css       base, fonts, paper texture
src/i18n/routes.ts          route keys → localised paths, getAlternatePath
src/i18n/ui.ts              UI strings per locale, t()
src/data/taxonomy.ts        categories + subcategories, localised labels/slugs
src/data/artists.ts         artist registry (facts, image, sources)
src/data/event.ts           event facts (placeholders) + workshops
src/content.config.ts       bios collection schema
src/content/bios/{fr,en}/*.md
src/assets/artists/*        downloaded images
src/assets/brand/logo.svg
src/components/*            header, nav, footer, lang-toggle, seo, json-ld, artist-card, artist-figure, monogram, pictogram
src/layouts/base-layout.astro
src/views/*                 shared page bodies (home, arts-index, category, artist, workshops, partners, about, legal, terms, credits, not-found)
src/pages/**, src/pages/en/**  thin locale wrappers
public/robots.txt, public/llms.txt (generated), public/favicon.*, public/og-default.png
scripts/fetch-commons-image.ts
scripts/check-dist-links.ts
tests/*.test.ts
```

## Route map (decided)

| key | fr | en |
|---|---|---|
| home | `/` | `/en/` |
| arts | `/arts/` | `/en/arts/` |
| category | `/arts/<frSlug>/` | `/en/arts/<enSlug>/` |
| artist | `/artistes/<slug>/` | `/en/artists/<slug>/` |
| workshops | `/ateliers/` | `/en/workshops/` |
| partners | `/partenariats/` | `/en/partners/` |
| about | `/a-propos/` | `/en/about/` |
| legal | `/mentions-legales/` | `/en/legal-notice/` |
| terms | `/cgu/` | `/en/terms/` |
| credits | `/credits/` | `/en/credits/` |

Category slugs fr/en: `arts-visuels`/`visual-arts`, `litterature-poesie`/`literature-poetry`, `musique`/`music`, `cinema-theatre`/`film-theatre`, `mode-design`/`fashion-design`. Subcategory keys: `painting`, `sculpture`, `photography`, `fiction`, `poetry`. Artist slugs are kebab-case names, identical in both locales (`billie-holiday-ella-fitzgerald`, `madonna-beyonce`, `jane-campion`, `amy-winehouse`…).

---

### Task 1: Scaffold, tokens, fonts, i18n core

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `netlify.toml`, `.nvmrc`, `vitest.config.ts`, `src/styles/tokens.css`, `src/styles/global.css`, `src/i18n/routes.ts`, `src/i18n/ui.ts`, `src/layouts/base-layout.astro`, `src/pages/index.astro`, `src/pages/en/index.astro`
- Test: `tests/routes.test.ts`

**Interfaces:**
- Produces:
  - `type Locale = 'fr' | 'en'`, `const LOCALES: readonly Locale[]`
  - `type RouteKey = 'home' | 'arts' | 'category' | 'artist' | 'workshops' | 'partners' | 'about' | 'legal' | 'terms' | 'credits'`
  - `getPath(key: RouteKey, locale: Locale, param?: string): string` (param = category key or artist slug; category key is mapped to the localised slug via taxonomy in Task 3, accept raw slug until then)
  - `getAlternatePath(pathname: string, target: Locale): string` (parses any built path back to key+param and rebuilds it)
  - `t(locale: Locale, key: UiKey): string`
  - `<BaseLayout locale title description pathname>` with a default slot

- [ ] **Step 1:** `npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git`, then `npm i` and add `@astrojs/sitemap @astrojs/check @fontsource/poiret-one @fontsource-variable/outfit` and dev `vitest typescript`. Set `site: 'https://lady-gallery.netlify.app'`, `trailingSlash: 'always'`, `i18n: { defaultLocale: 'fr', locales: ['fr','en'], routing: { prefixDefaultLocale: false } }`.
- [ ] **Step 2: Write failing tests** in `tests/routes.test.ts`:

```ts
expect(getPath('home', 'fr')).toBe('/')
expect(getPath('home', 'en')).toBe('/en/')
expect(getPath('workshops', 'en')).toBe('/en/workshops/')
expect(getPath('artist', 'fr', 'kate-bush')).toBe('/artistes/kate-bush/')
expect(getAlternatePath('/artistes/kate-bush/', 'en')).toBe('/en/artists/kate-bush/')
expect(getAlternatePath('/en/legal-notice/', 'fr')).toBe('/mentions-legales/')
expect(getAlternatePath('/unknown/', 'en')).toBe('/en/')
```

- [ ] **Step 3:** Run `npx vitest run tests/routes.test.ts` → FAIL (module missing).
- [ ] **Step 4:** Implement `routes.ts`, `ui.ts`, tokens (CSS custom properties for the Global Constraints colours, fluid type scale), global CSS (fonts imported from Fontsource, cream background, subtle SVG-noise paper texture as a CSS background, focus styles in red), `netlify.toml` (`command = "npm run build"`, `publish = "dist"`, `NODE_VERSION = "22"`, immutable cache for `/_astro/*`, headers `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: DENY`), and a `BaseLayout` with `<html lang>`.
- [ ] **Step 5:** `npx vitest run` → PASS; `npx astro check && npm run build` → 0 errors.
- [ ] **Step 6:** Commit `feat: scaffold astro site with i18n routes and brand tokens`.

### Task 2: Brand assets (logo, favicons, OG image, pictograms)

**Files:**
- Create: `src/assets/brand/logo.svg`, `public/favicon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png`, `public/og-default.png` (1200×630), `src/components/pictogram.astro`

**Interfaces:**
- Produces: `logo.svg` importable as an Astro image/inline SVG; `<Pictogram name="music" | "literature" | "visual-arts" | "film" | "fashion" />` inline SVG with `aria-hidden="true"`.

- [ ] **Step 1:** Isolate the selected logo group from `~/Downloads/Présentation Stratégie Réseaux sociaux Entreprise Moderne Bleu/4.svg` (beige disc, double red ring, navy/slate lettering, red silhouette): render the slide with `rsvg-convert`, find the logo's bbox, write a cropped SVG keeping only that group's paths, run `npx svgo`. Target < 40 KB.
- [ ] **Step 2:** Generate favicon set from the logo (`rsvg-convert` + `magick`), and `og-default.png`: logo left, "Lady Gallery" in Poiret One + tagline in Outfit on cream, under 150 KB.
- [ ] **Step 3:** Draw the five pictograms as single-colour line SVGs (stroke `currentColor`) in the spirit of the deck's iPod, typewriter, film camera, clothes rack, plus a brush/palette for visual arts.
- [ ] **Step 4:** Verify visually: render logo and OG PNG, Read them, compare with the reference logo. Logo SVG size < 40 KB.
- [ ] **Step 5:** Commit `feat: add logo, favicons, og image and pictograms`.

### Task 3: Content model (taxonomy, artist registry, bios collection)

**Files:**
- Create: `src/data/taxonomy.ts`, `src/data/artists.ts`, `src/data/event.ts`, `src/content.config.ts`, `src/content/bios/fr/*.md`, `src/content/bios/en/*.md` (43 stub files each, real content comes in Task 8)
- Modify: `src/i18n/routes.ts` (category param → localised slug via taxonomy)
- Test: `tests/content.test.ts`, extend `tests/routes.test.ts`

**Interfaces:**
- Produces:
  - `type CategoryKey = 'visual-arts' | 'literature' | 'music' | 'film' | 'fashion'`, `type SubcategoryKey = 'painting' | 'sculpture' | 'photography' | 'fiction' | 'poetry'`
  - `CATEGORIES: readonly Category[]` with `{ key, slug: Record<Locale,string>, label: Record<Locale,string>, pictogram, subcategories?: SubcategoryKey[] }`
  - `type ArtistImage = { file: string; alt: Record<Locale,string>; author: string; licence: string; licenceUrl: string; sourceUrl: string; kind: 'portrait' | 'artwork' }`
  - `type Artist = { slug: string; names: string[]; category: CategoryKey; subcategories: SubcategoryKey[]; years: string; nationality: Record<Locale,string>; image?: ArtistImage; sources: string[] }`
  - `ARTISTS: readonly Artist[]` in spec order; `getArtistsByCategory(key: CategoryKey): Artist[]`; `getArtist(slug: string): Artist` (throws with slug in message if unknown); `getNeighbours(slug: string): { prev?: Artist; next?: Artist }` within category
  - bios collection, id `<locale>/<slug>`, frontmatter `{ lede: string; works: { title: string; year?: string; kind: string }[]; whyHere: string; workshop?: 'bingo' | 'memory' | 'dobble' | 'guess-who' | 'reading' | 'craft' }`, body markdown
  - `EVENT` `{ date, time, venue, address, instagramHandle, instagramUrl, tiktokUrl, isPlaceholder: true }` with localised strings; `WORKSHOPS` list of 6 `{ key, title: Record<Locale,string> }`

- [ ] **Step 1: Write failing tests** in `tests/content.test.ts`:

```ts
expect(ARTISTS).toHaveLength(43)
expect(new Set(ARTISTS.map(a => a.slug)).size).toBe(43)
expect(getArtist('margaret-atwood').subcategories).toEqual(['fiction', 'poetry'])
expect(getArtist('madonna-beyonce').names).toEqual(['Madonna', 'Beyoncé'])
expect(getArtistsByCategory('music').map(a => a.slug)[0]).toBe('aretha-franklin')
for (const a of ARTISTS) for (const l of LOCALES) expect(existsSync(`src/content/bios/${l}/${a.slug}.md`)).toBe(true)
for (const a of ARTISTS) for (const s of a.subcategories) expect(CATEGORIES.find(c => c.key === a.category)!.subcategories ?? []).toContain(s)
expect(() => getArtist('nope')).toThrow(/nope/)
```

and in `tests/routes.test.ts`:

```ts
expect(getPath('category', 'en', 'film')).toBe('/en/arts/film-theatre/')
expect(getAlternatePath('/arts/mode-design/', 'en')).toBe('/en/arts/fashion-design/')
```

- [ ] **Step 2:** `npx vitest run` → FAIL.
- [ ] **Step 3:** Implement taxonomy, registry (facts filled in: years, nationality, sources; `image` left empty until Task 7), event placeholders (date "Printemps 2027 — date à confirmer", venue "Université de Bordeaux, campus à confirmer"), collection schema with zod, 86 stub bios (frontmatter valid, body one placeholder sentence).
- [ ] **Step 4:** `npx vitest run && npx astro check` → PASS.
- [ ] **Step 5:** Commit `feat: add taxonomy, artist registry and bios collection`.

### Task 4: Site chrome (header, nav, language toggle, footer) + dist link checker

**Files:**
- Create: `src/components/site-header.astro`, `src/components/site-nav.astro`, `src/components/lang-toggle.astro`, `src/components/site-footer.astro`, `scripts/check-dist-links.ts`
- Modify: `src/layouts/base-layout.astro`, `package.json` (scripts `check:links`)
- Test: `tests/dist.test.ts`

**Interfaces:**
- Consumes: `getPath`, `getAlternatePath`, `t`, `CATEGORIES`, `getArtistsByCategory`, `EVENT`
- Produces: `checkDistLinks(distDir: string): string[]` returning broken `href`s as `"<page> -> <href>"`; npm script `check:links` (exits 1 when non-empty)

- [ ] **Step 1: Write failing tests** in `tests/dist.test.ts` (run after `npm run build`):

```ts
expect(checkDistLinks('dist')).toEqual([])
const html = readFileSync('dist/artistes/kate-bush/index.html', 'utf8')
expect(html).toContain('href="/en/artists/kate-bush/"')
expect(html).toMatch(/<details[^>]*class="[^"]*nav-arts/)
```

- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement. Nav: "Les arts" is a `<details>`/`<summary>` mega-menu (5 columns, artists listed under subcategory headings), works without JS; a tiny inline script only closes it on outside click / Escape. Mobile (< 860px): whole nav inside a `<details>` hamburger. Lang toggle: `<a hreflang lang>` to `getAlternatePath(Astro.url.pathname, other)`. Footer: Instagram + TikTok placeholders, legal, CGU, credits, "Un projet du département de langues, Université de Bordeaux". Temporarily create stub routes for every key in both locales so links resolve (filled in Task 5).
- [ ] **Step 4:** `npm run build && npx vitest run && npm run check:links` → PASS.
- [ ] **Step 5:** Manual check: `npm run preview`, 360px width, Tab through nav, with JS disabled. Fix anything that traps focus or overflows.
- [ ] **Step 6:** Commit `feat: add header, nav, language toggle and footer`.

### Task 5: Pages (views + locale wrappers)

**Files:**
- Create: `src/views/home-view.astro`, `arts-index-view.astro`, `category-view.astro`, `artist-view.astro`, `workshops-view.astro`, `partners-view.astro`, `about-view.astro`, `legal-view.astro`, `terms-view.astro`, `credits-view.astro`, `not-found-view.astro`; `src/components/artist-card.astro`, `artist-figure.astro`, `monogram.astro`, `event-facts.astro`, `poster-placeholder.astro`; pages for every route in both locales (`src/pages/arts/[category].astro`, `src/pages/artistes/[slug].astro`, `src/pages/en/arts/[category].astro`, `src/pages/en/artists/[slug].astro`, `src/pages/404.astro`, `src/pages/en/404.astro`, …)
- Test: extend `tests/dist.test.ts`

**Interfaces:**
- Consumes: Task 3 data + collection, Task 4 chrome
- Produces: `<ArtistFigure artist locale />` (renders `<Image>` with credit caption, or `<Monogram>` when `image` undefined), `<EventFacts locale />`

- [ ] **Step 1: Write failing tests:**

```ts
expect(existsSync('dist/en/artists/billie-holiday-ella-fitzgerald/index.html')).toBe(true)
expect(readdirSync('dist/artistes')).toHaveLength(43)
expect(readdirSync('dist/en/artists')).toHaveLength(43)
const home = readFileSync('dist/index.html', 'utf8')
expect(home).toContain('à confirmer')
expect(readFileSync('dist/en/index.html', 'utf8')).toContain('TBC')
const noImg = ARTISTS.find(a => !a.image)!
expect(readFileSync(`dist/artistes/${noImg.slug}/index.html`, 'utf8')).toContain('class="monogram')
expect(existsSync('dist/en/404.html')).toBe(true)
```

- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement views. Home: hero (logo, name, tagline, `EventFacts` with "à confirmer" badge, Instagram CTA), posters strip (3 styled placeholder posters in brand colours, CSS-only), concept intro, five category tiles with pictograms, workshops teaser, footer. Category page: header with pictogram, artists grouped by subcategory as cards. Artist page: breadcrumb, `ArtistFigure`, name (duo names on two lines), years + nationality, lede, body, "À voir / écouter / lire" list from `works`, "Pourquoi elle est là" box linking to the workshop when set, prev/next. Workshops: one section per workshop with anchor ids (`#bingo`, …). Partners/about/legal/terms: honest placeholder copy (written in Task 9). Credits: generated from `ARTISTS[].image` + fonts. Long names: `overflow-wrap: anywhere` on headings, `text-wrap: balance`.
- [ ] **Step 4:** `npm run build && npx vitest run && npm run check:links` → PASS.
- [ ] **Step 5:** Commit `feat: add all pages in french and english`.

### Task 6: SEO and GEO

**Files:**
- Create: `src/components/seo-head.astro`, `src/components/json-ld.astro`, `public/robots.txt`, `src/pages/llms.txt.ts`
- Modify: `astro.config.mjs` (sitemap with `i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR', en: 'en-GB' } }`), `base-layout.astro`, each view (pass description + JSON-LD)
- Test: `tests/seo.test.ts`

**Interfaces:**
- Consumes: routes, data, collection
- Produces: `<SeoHead title description pathname locale image? />` emitting canonical, `hreflang` fr/en/x-default (x-default → fr), OG + Twitter meta; `<JsonLd data />`

- [ ] **Step 1: Write failing tests** (on built `dist/`):

```ts
const p = readFileSync('dist/artistes/kate-bush/index.html', 'utf8')
expect(p).toContain('<link rel="canonical" href="https://lady-gallery.netlify.app/artistes/kate-bush/"')
expect(p).toContain('hreflang="en" href="https://lady-gallery.netlify.app/en/artists/kate-bush/"')
expect(p).toContain('hreflang="x-default"')
expect(jsonLdTypes(p)).toEqual(expect.arrayContaining(['Person', 'BreadcrumbList']))
expect(jsonLdTypes(read('dist/artistes/madonna-beyonce/index.html')).filter(t => t === 'Person')).toHaveLength(2)
expect(jsonLdTypes(read('dist/index.html'))).toEqual(expect.arrayContaining(['Event', 'Organization']))
expect(read('dist/robots.txt')).toContain('Sitemap: https://lady-gallery.netlify.app/sitemap-index.xml')
expect(read('dist/llms.txt')).toContain('/en/artists/kate-bush/')
for (const f of allHtml('dist')) expect(read(f)).toMatch(/<meta name="description" content="[^"]{50,160}"/)
```

- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement. `Event` uses `eventStatus: EventScheduled`, `eventAttendanceMode: OfflineEventAttendanceMode`, `isAccessibleForFree: true`, organizer = Organization "Lady Gallery" with `parentOrganization` Université de Bordeaux, `startDate` from `EVENT` (placeholder ISO date). Descriptions: written per page, artists derived from `lede` trimmed to ≤ 160 chars on a word boundary.
- [ ] **Step 4:** `npm run build && npx vitest run` → PASS.
- [ ] **Step 5:** Commit `feat: add seo meta, json-ld, sitemap, robots and llms.txt`.

### Task 7: Artist images from Wikimedia Commons

**Files:**
- Create: `scripts/fetch-commons-image.ts`, `src/assets/artists/*`
- Modify: `src/data/artists.ts` (`image` per artist)
- Test: `tests/images.test.ts`

**Interfaces:**
- Produces: `npm run fetch-image -- <slug> "<File:Name.jpg>" <portrait|artwork>` downloads the original (max 1600px via `iiurlwidth`), reads `extmetadata` (`LicenseShortName`, `LicenseUrl`, `Artist`, stripped of HTML) from the Commons API, rejects licences outside the allow-list with a non-zero exit, and prints an `ArtistImage` object to paste.

- [ ] **Step 1: Write failing tests:**

```ts
const ALLOWED = /^(Public domain|PD.*|CC0|CC BY(-SA)? [0-9.]+)$/
for (const a of ARTISTS.filter(a => a.image)) {
  expect(a.image!.licence).toMatch(ALLOWED)
  expect(existsSync(`src/assets/artists/${a.image!.file}`)).toBe(true)
  expect(a.image!.alt.fr.length).toBeGreaterThan(10)
  expect(a.image!.alt.en.length).toBeGreaterThan(10)
}
const COPYRIGHTED_WORKS = ['georgia-okeeffe','tracey-emin','louise-bourgeois','barbara-hepworth','cindy-sherman']
for (const s of COPYRIGHTED_WORKS) expect(getArtist(s).image?.kind).not.toBe('artwork')
expect(ARTISTS.filter(a => a.image).length).toBeGreaterThanOrEqual(32)
```

- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement the script; then search Commons per artist (prefer a portrait; for Cassatt, Carr, Lange prefer a well-known public-domain work: e.g. Cassatt "The Child's Bath", Carr "Indian Church", Lange "Migrant Mother"). Skip any file whose licence is unclear; that artist falls back to the monogram.
- [ ] **Step 4:** `npx vitest run && npm run build` → PASS; images emitted as AVIF/WebP with `width`/`height`, `loading="lazy"` except the artist hero (`fetchpriority="high"`).
- [ ] **Step 5:** Commit `feat: add credited artist images from wikimedia commons`.

### Task 8: Artist bios (FR + EN), one sub-task per category

**Files:**
- Modify: `src/content/bios/{fr,en}/<slug>.md` for all 43, `src/data/artists.ts` (`sources`)
- Test: `tests/copy.test.ts`

Split into 8a visual arts (8), 8b literature (10), 8c music (11), 8d film & theatre (9), 8e fashion (5). Independent, can run in parallel.

- [ ] **Step 1: Write failing test** `tests/copy.test.ts`:

```ts
const BANNED = /\b(trailblaz|iconic|iconique|timeless|intemporel|testament|shattered|pioneering|avant-gardiste visionnaire|tapestry|delve|vibrant|incontournable|légendaire|legendary)\w*/i
for (const a of ARTISTS) for (const l of LOCALES) {
  const md = read(`src/content/bios/${l}/${a.slug}.md`)
  const body = md.split('---').slice(2).join('---')
  const words = body.trim().split(/\s+/).length
  expect(words).toBeGreaterThanOrEqual(180); expect(words).toBeLessThanOrEqual(300)
  expect(body).not.toMatch(BANNED)
  expect(body).not.toContain('—')
  expect(body).not.toMatch(/lorem/i)
}
for (const a of ARTISTS) expect(a.sources.length).toBeGreaterThanOrEqual(2)
```

- [ ] **Step 2:** Run → FAIL (stubs).
- [ ] **Step 3:** For each artist: read 2+ sources (Wikipedia FR + EN, plus museum/Britannica/official), write FR first then EN (adapted, not literal), 3–4 short paragraphs: who she is in one concrete sentence; one specific scene, work or turning point; what to look/listen/read for; `whyHere` tying her to the event and workshop. `lede` ≤ 160 chars. Duo pages explain both and the pairing. Atwood mentions both her novels and her poetry.
- [ ] **Step 4:** Run the `humanizer` skill over each batch, then re-run `npx vitest run tests/copy.test.ts` → PASS.
- [ ] **Step 5:** Commit per category, e.g. `content: add music artist bios`.

### Task 9: Page copy (home, workshops, about, partners, legal)

**Files:**
- Modify: `src/i18n/ui.ts`, `src/data/event.ts`, views from Task 5
- Test: `tests/copy.test.ts` (extend BANNED + no-em-dash scan to `ui.ts`, `event.ts`, views)

- [ ] **Step 1:** Extend test to scan these files' strings → FAIL if any banned term or em dash.
- [ ] **Step 2:** Write: home intro (the concept in 3 short sentences, using the Insta bio tone "Women just wanna make/create/shape it" as the hook, kept in English in both locales), workshop descriptions with mock how-to-play (bingo: tracks by the artists, first full line wins; memory: pairs of paintings by the painters; Dobble: fashion pieces as symbols; Qui est-ce ?: actresses and directors; stand lecture: excerpts from the authors; atelier manuel: collage in the moodboard's style), about (department, students, why anglophone women artists, placeholder team), partners ("annoncés bientôt" + how to become one), mentions légales and CGU templates with `[à compléter]` publisher fields, no-cookie statement.
- [ ] **Step 3:** Humanizer pass; `npx vitest run && npm run build` → PASS.
- [ ] **Step 4:** Commit `content: write home, workshops and info pages copy`.

### Task 10: Ship and verify

**Files:**
- Create: `README.md` (short: what it is, `npm i`, `npm run dev`, where to edit event facts and bios)

- [ ] **Step 1:** Full gate: `npx astro check && npx vitest run && npm run build && npm run check:links` → all clean.
- [ ] **Step 2:** `gh repo create AirKyzzZ/lady-gallery --public --source . --push` (user authorised a public repo).
- [ ] **Step 3:** `netlify sites:create --name lady-gallery` (fallback name `lady-gallery-bordeaux` if taken), link repo for continuous deploy on `main`, `netlify deploy --prod`. Confirm the live URL returns 200 for `/`, `/en/`, `/artistes/kate-bush/`, `/sitemap-index.xml`, `/robots.txt`, `/llms.txt`, and that a missing path serves the 404 page.
- [ ] **Step 4:** Lighthouse mobile on the live URL for `/`, `/arts/musique/`, `/artistes/kate-bush/`: `npx lighthouse <url> --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --output=json`. Expected 100 ×4 on each. Fix and redeploy until met.
- [ ] **Step 5:** Real-browser pass in Maxime's Chrome (claude-in-chrome): desktop + 375px, nav dropdown, mobile menu, FR↔EN toggle on home/category/artist, an image credit link, 404. Record a GIF `lady-gallery-walkthrough.gif`.
- [ ] **Step 6:** SEO/GEO audit by a fresh subagent against the live URL; fix confirmed issues, redeploy.
- [ ] **Step 7:** Commit fixes `fix: …` and push.
