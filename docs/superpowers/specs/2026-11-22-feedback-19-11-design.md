# Lady Gallery — client feedback of 19 Nov

## Intent

The event (Tue 1 Dec 2026, 11h–13h30) is nine days out and the posters are printed. The site has to match them: new venue, the real posters, the partners who give the prizes, and the real workshop rules written by the pôle création. The current workshop text was invented before the rules existed and contradicts them.

## Goals

- Venue reads "hall de la CLEFF" (EN "CLEFF hall") everywhere, same campus address (Esplanade des Antilles, 33607 Pessac).
- The 3 real posters (main poster, flyer recto, flyer verso) replace the CSS placeholders on the home page.
- Partners page shows logos in two groups: relay (ISIC Rider) and prize donors (Fnac, Krazy Kat, Book Lovers, Utopia).
- Workshops page rebuilt from the pôle création Google Doc (visitor wording), grouped like the flyer verso, with a new "Pause gourmande" stand.
- Legal notice publisher: Oriane Poupard, orianepoupard@icloud.com.
- Stay at Lighthouse 4x100, all checks green.

## Non-goals

- Client copy still being written (home intro, "cinq salles", per-art texts, FAQ subsections, à propos): later pass.
- Logo row on the home page, lightbox, JS of any kind.

## Anti-goals

- Reintroducing invented workshop details. Only what the Doc or posters say.
- Breaking the copy test rules (no em dashes, banned wording) or the 4x100.

## Approaches

1. **Extend the current views and copy files** (picked). `event.ts`, `*-copy.ts`, the existing views and components, Astro `<Image>` for posters and logos. No new dependency.
2. Move workshop and partner data to content collections. More structure than a one-off event needs.
3. Embed posters as a PDF or lightbox gallery. Needs JS or a heavier asset, for no gain over linked images.

## Decisions

- **Posters:** keep the tilted 3-up layout (desktop grid, horizontal scroll on phones). Each poster is an optimised image with descriptive alt text, linking to its full-size file. Order: main poster, flyer recto, flyer verso. Placeholder copy ("en cours de dessin", "Affiche à venir") removed. The main poster reuses press photos; client accepted publishing it.
- **Partners:** a card per partner with logo on a light tile, name, one line on their role, link to their site or Instagram. "Book Lovers" is the correct spelling. Logo sources: ISIC Rider from the university site (trimmed), Fnac official SVG with letters filled black, Utopia vector PNG from their site, Krazy Kat Linktree avatar, Book Lovers site logo. Credits page lists the partner logos as belonging to their owners.
- **Workshops**, grouped as on the flyer verso:
  - Jeux libres d'accès: Qui est-ce ? (cinéma), Dobble (mode), Memory (peinture)
  - Stands libres d'accès: Coin lecture (littérature), Atelier sculpture, Pause gourmande
  - Bingo musical, 12h45–13h30
  
  Each stand: players, duration only where known (Qui est-ce 5 to 10 min per round, bingo slot), the steps from the Doc, its closing line, link to the related art. "Stand lecture" becomes "Coin lecture", "Atelier manuel" becomes "Atelier sculpture". Day schedule replaces "horaires annoncés avec le programme". EN translated. Home workshop teasers updated to match.
- **Photography:** Cindy Sherman and Dorothea Lange lose their workshop link (craft is now sculpture only).
- **CGU:** drop the sentence about the "à confirmer" badge.

## Left to the builder

Exact card markup and styling within the existing tokens, poster image sizes, alt text wording, EN phrasing, test updates.
