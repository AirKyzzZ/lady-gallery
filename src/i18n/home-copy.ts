import type { WorkshopKey } from '../data/event'
import type { Locale } from './routes'

type HomeCopy = {
  title: string
  description: string
  kicker: string
  intro: string
  instagram: string
  seeArtists: string
  logoAlt: string
  roomsTitle: string
  roomsIntro: string
  andMore: (count: number) => string
  postersTitle: string
  postersIntro: string
  posters: [string, string, string]
  posterCaption: string
  workshopsTitle: string
  workshopsIntro: string
  workshopLines: Record<WorkshopKey, string>
}

export const HOME_COPY: Record<Locale, HomeCopy> = {
  fr: {
    title: 'Lady Gallery : exposition gratuite d’artistes femmes anglophones à Bordeaux',
    description:
      'Une journée à l’Université de Bordeaux autour de 45 artistes anglophones : peintres, autrices, musiciennes, actrices, créatrices de mode. Entrée libre.',
    kicker: 'Département de langues, Université de Bordeaux',
    intro:
      'Une journée, quarante-cinq femmes. Des peintres, des romancières, des chanteuses, des cinéastes, des créatrices de mode, toutes de langue anglaise. On les expose, on les lit, on les écoute, et on joue avec elles.',
    instagram: 'Suivre',
    seeArtists: 'Voir les artistes',
    logoAlt: 'Logo Lady Gallery : silhouette de femme en chignon dans un médaillon beige',
    roomsTitle: 'Cinq salles',
    roomsIntro:
      'Le parcours est découpé comme une galerie. Chaque salle a ses artistes, et chaque artiste a sa page.',
    andMore: (count) => (count === 1 ? ` et 1 autre` : ` et ${count} autres`),
    postersTitle: 'Les affiches',
    postersIntro: 'Elles sont en cours de dessin. On les publie ici et sur Instagram dès qu’elles sont prêtes.',
    posters: ['Les arts', 'Les ateliers', 'Le jour J'],
    posterCaption: 'Affiche à venir',
    workshopsTitle: 'Six ateliers',
    workshopsIntro: 'Entre deux salles, on joue. Tout est gratuit et ouvert à tout le monde, sans inscription.',
    workshopLines: {
      bingo: 'Reconnaître Aretha, Kate Bush ou Lorde en trois notes.',
      memory: 'Retrouver les paires de tableaux, de Mary Cassatt à Emily Carr.',
      dobble: 'Minijupe, corset, robe de mariée : le premier qui voit gagne.',
      'guess-who': 'Le Qui est-ce ? des actrices et des réalisatrices.',
      reading: 'Des extraits à lire sur place, en anglais et en français.',
      craft: 'Découper, coller, composer votre propre affiche.',
    },
  },
  en: {
    title: 'Lady Gallery: free exhibition of English-speaking women artists in Bordeaux',
    description:
      'A day at the University of Bordeaux about 45 English-speaking women: painters, writers, singers, actresses, fashion designers. Free entry.',
    kicker: 'Language department, University of Bordeaux',
    intro:
      'One day, forty-five women. Painters, novelists, singers, filmmakers and fashion designers, all of them English-speaking. We hang them, read them, listen to them and play games with them.',
    instagram: 'Follow',
    seeArtists: 'See the artists',
    logoAlt: 'Lady Gallery logo: silhouette of a woman with a chignon inside a beige medallion',
    roomsTitle: 'Five rooms',
    roomsIntro: 'The visit is laid out like a gallery. Each room has its artists, and each artist has her own page.',
    andMore: (count) => ` and ${count} more`,
    postersTitle: 'The posters',
    postersIntro: 'They are still being drawn. They will go up here and on Instagram as soon as they are ready.',
    posters: ['The arts', 'The workshops', 'The day'],
    posterCaption: 'Poster coming soon',
    workshopsTitle: 'Six workshops',
    workshopsIntro: 'Between two rooms, you play. Everything is free and open to everyone, no booking needed.',
    workshopLines: {
      bingo: 'Name Aretha, Kate Bush or Lorde in three notes.',
      memory: 'Match the pairs of paintings, from Mary Cassatt to Emily Carr.',
      dobble: 'Miniskirt, corset, wedding dress: first to spot it wins.',
      'guess-who': 'Guess Who? with actresses and directors.',
      reading: 'Excerpts to read on the spot, in English and French.',
      craft: 'Cut, glue and put together your own poster.',
    },
  },
}
