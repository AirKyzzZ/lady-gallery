import type { ImageMetadata } from 'astro'
import type { Artist } from '../data/artists'
import type { Locale } from '../i18n/routes'

const IMAGES = import.meta.glob<{ default: ImageMetadata }>('../assets/artists/*.{jpg,jpeg,png,webp}', {
  eager: true,
})

export const getArtistImage = (artist: Artist): ImageMetadata | undefined => {
  if (!artist.image) return undefined
  const found = IMAGES[`../assets/artists/${artist.image.file}`]
  if (!found) throw new Error(`Missing image file for ${artist.slug}: ${artist.image.file}`)
  return found.default
}

export const formatYears = (years: string, locale: Locale): string => {
  const born = years.match(/^b\. (\d{4})$/)
  if (!born) return years
  return locale === 'fr' ? `née en ${born[1]}` : `born ${born[1]}`
}

export const initials = (artist: Artist): string =>
  artist.names
    .map((name) => name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2))
    .join('&')

export const toRoman = (n: number): string => ['I', 'II', 'III', 'IV', 'V', 'VI'][n - 1] ?? String(n)
