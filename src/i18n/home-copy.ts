import type { WorkshopKey } from '../data/event'
import type { Locale } from './routes'

type PosterCopy = { alt: string; caption: string }

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
  posters: [PosterCopy, PosterCopy, PosterCopy]
  workshopsTitle: string
  workshopsIntro: string
  workshopLines: Record<WorkshopKey, string>
}

export const HOME_COPY: Record<Locale, HomeCopy> = {
  fr: {
    title: 'Lady Gallery : exposition gratuite d’artistes femmes anglophones à Bordeaux',
    description:
      'Le 1er décembre à l’Université Bordeaux Montaigne : 45 artistes anglophones, peintres, autrices, musiciennes, actrices, créatrices de mode. Entrée libre.',
    kicker: 'Département STC, Université Bordeaux Montaigne',
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
    postersIntro: 'L’affiche et le flyer de la journée. Cliquez pour les voir en grand.',
    posters: [
      {
        caption: 'Affiche',
        alt: 'Affiche Lady Gallery : mardi 1er décembre, de 11h à 13h30, hall de la CLEFF. Ateliers ludiques, jeux de société et quiz gratuits pour découvrir la peinture, la sculpture, la mode, le cinéma, la musique et la littérature grâce à des artistes féminines du monde anglo-saxon. De nombreux lots à remporter. Instagram @ladygallery.event.',
      },
      {
        caption: 'Flyer recto',
        alt: 'Flyer Lady Gallery, recto : le 1er décembre, de 11h à 13h30. Bingo, breakfast, Dobble, Memory, livres et plus encore. Instagram @ladygallery.event.',
      },
      {
        caption: 'Flyer verso',
        alt: 'Flyer Lady Gallery, verso : jeux libres d’accès (Qui est-ce ? cinéma, Dobble mode, Memory peinture), stands libres d’accès (livres et littérature, atelier sculpture), bingo musical de 12h45 à 13h30. Découvrez l’art féminin anglophone à travers des ateliers et un breakfast, repartez avec votre création, gagnez des lots.',
      },
    ],
    workshopsTitle: 'Au programme',
    workshopsIntro: 'Jeux et stands en libre accès de 11h à 13h30, bingo musical de 12h45 à 13h30. Tout est gratuit, sans inscription.',
    workshopLines: {
      'guess-who': 'Retrouver le film mystère parmi 24, en questions fermées.',
      dobble: 'Repérer le symbole de mode commun à deux cartes.',
      memory: 'Retrouver 12 paires d’œuvres d’artistes femmes.',
      reading: 'Feuilleter des livres d’autrices anglophones et laisser un mot.',
      craft: 'Modeler votre sculpture et repartir avec.',
      snack: 'Cookies, brownies, muffins et spécialités anglophones.',
      bingo: 'Reconnaître les chansons en 5 secondes, de 12h45 à 13h30.',
    },
  },
  en: {
    title: 'Lady Gallery: free exhibition of English-speaking women artists in Bordeaux',
    description:
      'On 1 December at Bordeaux Montaigne University: 45 English-speaking women, painters, writers, singers, actresses, fashion designers. Free entry.',
    kicker: 'STC department, Bordeaux Montaigne University',
    intro:
      'One day, forty-five women. Painters, novelists, singers, filmmakers and fashion designers, all of them English-speaking. We hang them, read them, listen to them and play games with them.',
    instagram: 'Follow',
    seeArtists: 'See the artists',
    logoAlt: 'Lady Gallery logo: silhouette of a woman with a chignon inside a beige medallion',
    roomsTitle: 'Five rooms',
    roomsIntro: 'The visit is laid out like a gallery. Each room has its artists, and each artist has her own page.',
    andMore: (count) => ` and ${count} more`,
    postersTitle: 'The posters',
    postersIntro: 'The poster and flyer for the day. Click to see them full size.',
    posters: [
      {
        caption: 'Poster',
        alt: 'Lady Gallery poster: Tuesday 1 December, 11am to 1:30pm, CLEFF hall. Free workshops, board games and quizzes to discover painting, sculpture, fashion, film, music and literature through women artists from the English-speaking world. Lots of prizes to win. Instagram @ladygallery.event.',
      },
      {
        caption: 'Flyer, front',
        alt: 'Lady Gallery flyer, front: 1 December, 11am to 1:30pm. Bingo, breakfast, Dobble, Memory, books and more. Instagram @ladygallery.event.',
      },
      {
        caption: 'Flyer, back',
        alt: 'Lady Gallery flyer, back: drop-in games (Who’s This? film, fashion Dobble, painting Memory), drop-in stands (books and literature, sculpture workshop), music bingo from 12:45 to 1:30pm. Discover English-speaking women’s art through workshops and a breakfast, take home what you make, win prizes.',
      },
    ],
    workshopsTitle: 'On the day',
    workshopsIntro: 'Games and stands are open from 11am to 1:30pm, music bingo runs from 12:45 to 1:30pm. Everything is free, no booking needed.',
    workshopLines: {
      'guess-who': 'Find the mystery film among 24 with yes-or-no questions.',
      dobble: 'Spot the fashion symbol two cards share.',
      memory: 'Match 12 pairs of works by women artists.',
      reading: 'Browse books by English-speaking women writers and leave a note.',
      craft: 'Shape your own sculpture and take it home.',
      snack: 'Cookies, brownies, muffins and treats from English-speaking countries.',
      bingo: 'Name the songs in 5 seconds, 12:45 to 1:30pm.',
    },
  },
}
