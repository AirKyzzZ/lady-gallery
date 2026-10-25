# Lady Gallery — site v1 design

## Intent

Lady Gallery is a one-day event run by students of the language department (Université de Bordeaux) celebrating English-speaking women artists across visual arts, literature, music, film/theatre and fashion. The event mixes an exhibition-style walk through these artists with game-based workshops (musical bingo, memory, Dobble, Guess Who, a reading stand, a craft workshop).

The site is the event's public home: students and the general public land on it from Instagram, posters and QR codes. It must tell them when/where/what in seconds, then let them browse the artists featured. It is also a university project, so it will be looked at by teachers — quality and care matter.

Insta bio draft (from the Canva deck), the tone to follow: *"Women just wanna make/create/shape it. Découvrez l'art féminin anglophone. Event incoming… she made it!"*

## Goals

- v1 live on `lady-gallery.netlify.app`, deployed from a public GitHub repo (`AirKyzzZ/lady-gallery`).
- Event key facts (date, time, place, Instagram, posters) visible on the home page above the fold on mobile.
- One page per artist (43), with a real, specific, human-sounding bio in FR and EN.
- Bilingual: French default at `/`, English at `/en/`, toggle in the header that keeps the current page.
- Lighthouse mobile 100/100/100/100 (Performance, Accessibility, Best Practices, SEO) on home, a category page and an artist page.
- SEO/GEO: sitemap, robots.txt, canonical + hreflang, OG/Twitter meta, JSON-LD (`Event`, `Organization`, `Person` per artist, `BreadcrumbList`), `llms.txt`.

## Non-goals (v1)

- No CMS, no backend, no forms, no ticketing, no analytics, no cookies.
- No custom domain.
- Final event facts, final Instagram handle, real posters, partners and team: not known yet, follow-up later.

## Anti-goals

- **AI-slop copy.** No "trailblazer who shattered barriers", "iconic", "timeless legacy", "a testament to", rule-of-three padding, em-dash cascades. Bios read like a curator's wall label written by a student who actually likes the artist: concrete facts, a work or two named, one angle or anecdote, why she's in this event.
- **Generic template look.** It must look like the Canva identity (retro, Art-Deco titles, paper/collage, red + navy on cream), not a SaaS landing page.
- **Copyright problems.** No image without a verified licence and a credit.
- Placeholder event facts must never look final: clearly marked "à confirmer / TBC".

## Constraints

- Brand (from the spec `cahier des charges` + Canva slide 6):
  - background: cream `#F3EBE0` (spec: lighter than `#BEA787`; `#BEA787` beige usable as a secondary surface, it's the logo disc colour)
  - elements/text: navy `#292F43`
  - accent: red `#9D160D`
  - secondary: ochre `#DF9E3F`
  - deck extras usable sparingly: sage `#8E977A`, slate `#59697C`
  - text contrast must pass WCAG AA (ochre is decorative only, never text on cream).
- Fonts: spec asks Ardeco (titles) and Codec Pro (body), both commercial and not available. Use free near-matches, self-hosted: **Poiret One** (titles), **Outfit** (body). Swappable in one place later.
- Logo: the beige disc with double red ring, navy/slate "LADY GALLERY" lettering and red silhouette (Canva slide 4). Source: `~/Downloads/Présentation Stratégie Réseaux sociaux Entreprise Moderne Bleu/4.svg`, extract the logo, export optimised SVG + PNG favicon set.
- Pictograms from the deck (iPod, typewriter, clothes rack, film camera, open book) map to music, literature, fashion, cinema, and visual arts (use a palette/brush pictogram if none in deck). Redraw as simple inline SVG line icons in the same spirit if extraction is impractical.
- Maxime's conventions: TypeScript strict, kebab-case files, named exports, zero code comments by default, conventional commits subject-only.

## Content model

### Navigation (from the spec)

- **Les arts / The arts**
  - Arts visuels — Peinture: Georgia O'Keeffe, Mary Cassatt, Tracey Emin, Emily Carr · Sculpture: Louise Bourgeois, Barbara Hepworth · Photographie: Dorothea Lange, Cindy Sherman
  - Littérature & poésie — Romans & nouvelles: Toni Morrison, Joan Didion, Virginia Woolf, Agatha Christie, Margaret Atwood, Alice Munro, Miles Franklin, Nadine Gordimer · Poésie: Sylvia Plath, Maya Angelou, Margaret Atwood
  - Musique — Aretha Franklin, Billie Holiday & Ella Fitzgerald, Patti Smith, Madonna & Beyoncé, Amy Winehouse, Kate Bush, Adele, Joni Mitchell, Alanis Morissette, Lorde, Rihanna
  - Cinéma & théâtre — Meryl Streep, Katharine Hepburn, Greta Gerwig, Kathryn Bigelow, Judi Dench, Maggie Smith, Cate Blanchett, Nicole Kidman, Jane Campion
  - Mode & design — Vivienne Westwood, Mary Quant, Stella McCartney, Vera Wang, Claire McCardell
- **Ateliers / Workshops**: Bingo musical, Memory (peinture), Dobble (mode), Qui est-ce ? (cinéma), Stand lecture, Atelier manuel
- **Partenariats / Partners**
- **À propos / About**

Spec typos corrected: Jane Campion, Amy Winehouse, Dobble.

### Decisions on edge cases

- Duos listed as one entry in the spec ("Billie Holiday & Ella Fitzgerald", "Madonna & Beyoncé") stay **one page per duo**, because the organisers grouped them deliberately (pairing/contrast). The page treats both women and the reason they're paired.
- Margaret Atwood: **one page**, tagged under both Romans & nouvelles and Poésie; appears in both lists.
- That gives 43 artist pages (45 distinct women, 2 duo pages, Atwood once).

### Artist page

- name, life dates (or birth year), nationality, discipline/sub-category
- portrait or artwork image with credit + licence link, or a styled fallback (initials/monogram on brand colours) when no safe image exists
- bio FR + EN, ~180–280 words each, 3–4 short paragraphs
- "À voir / écouter / lire" — 2–4 key works
- "Pourquoi elle est là" — 1–2 sentences linking to the event (or to a workshop where relevant: music → bingo, painting → memory, fashion → Dobble, cinema → Qui est-ce ?, literature → stand lecture)
- previous/next artist within category, breadcrumb

### Images and licences

- Sources: Wikimedia Commons (verify licence per file), Unsplash for ambient/texture only.
- Public-domain artworks OK: Mary Cassatt, Emily Carr, Dorothea Lange (FSA/US gov works). Others (O'Keeffe, Emin, Bourgeois, Hepworth, Sherman, etc.): no artwork reproductions; portrait under CC licence only, otherwise fallback.
- Every image: author, licence, source URL recorded in content frontmatter, shown under the image and aggregated on a `/credits` page.
- Images downloaded into the repo and optimised at build (AVIF/WebP, responsive sizes, explicit dimensions).

### Home page

Logo, event name, tagline, date / time / place (placeholders marked "à confirmer"), Instagram link (placeholder handle `@ladygallery`), posters section (styled placeholder posters until real ones exist), short intro to the concept, the five art categories with pictograms, the workshops teaser, footer.

### Other pages

- `/arts` overview, `/arts/<category>` grouped by sub-category, `/artistes/<slug>`; EN mirrors under `/en/` with translated slugs left identical (artist slugs are names) and category slugs translated.
- `/ateliers` one page, a section per workshop (mock description, how it plays, which artists it uses).
- `/partenariats`, `/a-propos`: honest placeholders ("Partenaires annoncés bientôt", team section with placeholder names, University of Bordeaux mention).
- `/mentions-legales`, `/cgu`, `/credits`: templates with placeholders for publisher info (to be completed later). No cookies, stated.
- Footer: legal links, credits, Instagram (+ TikTok placeholder), language toggle.
- 404 page in brand style.

## How (decided)

- Astro (latest stable) static output, TypeScript strict, content collections (artists as Markdown with typed frontmatter, one file per artist per locale or one file with both locales — builder's call), Astro i18n routing (`fr` default without prefix, `en` prefixed).
- No UI framework; vanilla JS only where needed (mobile menu, nav dropdown), progressive enhancement, works without JS.
- Fonts via Fontsource packages, subset latin, `font-display: swap`, preload the title font.
- Netlify static deploy linked to the GitHub repo (continuous deployment on `main`), `netlify.toml` with caching and security headers.
- Verification: `astro check` + build clean, Lighthouse CLI mobile on 3 page types (target 4×100), then real-browser pass in Maxime's Chrome (desktop + mobile width, FR/EN toggle, nav, all links), then an SEO audit subagent.

## Settled after builder review

- **Who writes the bios:** Claude drafts all bios and works lists (FR + EN). Facts only from verifiable sources (Wikipedia FR/EN, museum/official sites, Britannica); no invented anecdotes or quotes, quotes only if sourced. Each artist file lists its sources in frontmatter (not displayed, for proofreading). A humanizer pass removes AI patterns. The organiser proofreads before the event.
- **Lighthouse 4×100:** hard target (from the spec: "core web vitals chrome 4x100"). Design budget accordingly: two font families, CSS/SVG textures only, no client framework.
- **Logo** *(builder's call)*: extract from Canva slide `4.svg` (outlined vector paths); if it can't be isolated cleanly, crop the vector group by hand. No redraw.
- **Versions** *(builder's call)*: latest stable Astro 5.x, Node 22 LTS pinned for Netlify via `.nvmrc` / `netlify.toml`.
- **Fonts** *(builder's call)*: Poiret One and Outfit both cover French diacritics. Poiret One for display sizes only (≥ 1.75rem); Outfit for all UI and body text.
- **OG images** *(builder's call)*: one shared branded OG image for v1, plus artist portrait as `og:image` when a safe image exists. No build-time image generation.
- **i18n completeness** *(builder's call)*: every page and artist must exist in both locales; missing translation fails the build. hreflang always paired.
- **Person JSON-LD / llms.txt** *(builder's call)*: JSON-LD per page in that page's language; `llms.txt` in English, links to both locales' indexes.
- **Credits** *(builder's call)*: `/credits` lists only real third-party assets (images, fonts); fallbacks are not credited.

## Left to the builder

- Exact layout, visual details and motion (subtle, respects `prefers-reduced-motion`), within the brand and anti-goals.
- Collage/paper texture treatment, as long as it stays light (CSS/SVG, no heavy bitmaps above the fold).
- Component breakdown and file layout.
