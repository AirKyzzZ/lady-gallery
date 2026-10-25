# Lady Gallery

Site of Lady Gallery, a student event from the language department of the University of Bordeaux about English-speaking women artists. French by default, English under `/en/`.

Live: https://lady-gallery.netlify.app

## Run it

```sh
npm install
npm run dev
```

`npm run build`, `npm test` (after a build), `npm run check:links` and `npm run check` are the checks to run before pushing. Netlify deploys `main` automatically.

## Where to edit

- Event facts (date, time, venue, Instagram handle): `src/data/event.ts`. Set `isPlaceholder` to `false` once they are final, it removes the "à confirmer" badges.
- Artist bios: `src/content/bios/fr/<slug>.md` and `src/content/bios/en/<slug>.md`.
- Artist facts and image credits: `src/data/artist-facts.json`, images in `src/assets/artists/`.
- Page text: `src/i18n/*-copy.ts`, navigation and footer strings in `src/i18n/ui.ts`.
- Legal notice publisher fields marked `[à compléter]`: `src/views/legal-view.astro`.
