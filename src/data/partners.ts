import type { ImageMetadata } from 'astro'
import isicRider from '../assets/partners/isic-rider.png'
import fnac from '../assets/partners/fnac.svg'
import krazyKat from '../assets/partners/krazy-kat.jpg'
import bookLovers from '../assets/partners/book-lovers.jpg'
import utopia from '../assets/partners/utopia.png'

export type PartnerRole = 'relay' | 'prizes'
export type PartnerKey = 'isic-rider' | 'fnac' | 'krazy-kat' | 'book-lovers' | 'utopia'

export type Partner = {
  key: PartnerKey
  name: string
  role: PartnerRole
  url: string
  logo: ImageMetadata
  darkTile?: boolean
}

export const PARTNER_ROLES: readonly PartnerRole[] = ['relay', 'prizes']

export const PARTNERS: readonly Partner[] = [
  { key: 'isic-rider', name: 'ISIC Rider', role: 'relay', url: 'https://www.instagram.com/isic_rider/', logo: isicRider },
  { key: 'fnac', name: 'Fnac', role: 'prizes', url: 'https://www.fnac.com', logo: fnac, darkTile: true },
  { key: 'krazy-kat', name: 'Krazy Kat', role: 'prizes', url: 'https://www.canalbd.net/krazy-kat/', logo: krazyKat },
  { key: 'book-lovers', name: 'Book Lovers', role: 'prizes', url: 'https://www.booklovers.fr', logo: bookLovers },
  { key: 'utopia', name: 'Utopia', role: 'prizes', url: 'https://bordeaux.cinemas-utopia.org', logo: utopia },
]
