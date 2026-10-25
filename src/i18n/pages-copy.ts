import type { WorkshopKey } from '../data/event'
import type { Locale } from './routes'

type Workshop = { lead: string; howTo: string[]; artists: string }

export const WORKSHOPS_COPY: Record<
  Locale,
  {
    title: string
    description: string
    intro: string
    howToTitle: string
    artistsTitle: string
    note: string
    items: Record<WorkshopKey, Workshop>
  }
> = {
  fr: {
    title: 'Ateliers',
    description:
      'Bingo musical, memory, Dobble, Qui est-ce ?, stand lecture et atelier collage : les six ateliers gratuits de Lady Gallery.',
    intro:
      'Six jeux et ateliers pour passer d’une salle à l’autre autrement qu’en lisant des cartels. Gratuits, sans inscription, en français et en anglais.',
    howToTitle: 'Comment on joue',
    artistsTitle: 'Avec',
    note: 'Les horaires de chaque atelier seront annoncés avec le programme.',
    items: {
      bingo: {
        lead: 'On lance un extrait, vous cochez l’artiste sur votre grille. Trois secondes suffisent parfois.',
        howTo: [
          'Chaque joueur reçoit une grille de seize artistes.',
          'L’animatrice passe des extraits de quelques secondes, dans le désordre.',
          'Première ligne complète : criez « Lady ! » et venez faire vérifier.',
        ],
        artists: 'Aretha Franklin, Billie Holiday, Ella Fitzgerald, Kate Bush, Amy Winehouse, Lorde et les autres musiciennes.',
      },
      memory: {
        lead: 'Des cartes retournées, des tableaux à retrouver par paires. Le jeu oblige à regarder vraiment.',
        howTo: [
          'Les cartes sont posées face cachée.',
          'À votre tour, retournez-en deux. Même œuvre : vous les gardez et vous rejouez.',
          'À la fin, on vous demande de qui est le tableau. Bonus si vous trouvez.',
        ],
        artists: 'Mary Cassatt, Emily Carr et les peintres de la salle I.',
      },
      dobble: {
        lead: 'Entre deux cartes, il y a toujours un seul symbole en commun. Ici, ce sont des pièces de mode.',
        howTo: [
          'Une minijupe, un corset punk, une robe de mariée, une robe portefeuille.',
          'Retournez une carte : le premier qui nomme le symbole commun la remporte.',
          'Chaque symbole renvoie à une créatrice, on vous dira laquelle.',
        ],
        artists: 'Vivienne Westwood, Mary Quant, Stella McCartney, Vera Wang, Claire McCardell.',
      },
      'guess-who': {
        lead: 'Le Qui est-ce ? classique, mais avec des actrices et des réalisatrices.',
        howTo: [
          'Chaque joueur choisit une femme en secret.',
          'On pose des questions fermées : « A-t-elle réalisé un film ? », « A-t-elle joué la reine ? »',
          'On baisse les volets jusqu’à ce qu’il n’en reste qu’une.',
        ],
        artists: 'Meryl Streep, Katharine Hepburn, Greta Gerwig, Judi Dench, Cate Blanchett, Jane Campion et les autres.',
      },
      reading: {
        lead: 'Une table, des livres, des fauteuils. Prenez un extrait, lisez-le, laissez un mot si vous voulez.',
        howTo: [
          'Des extraits courts, en anglais avec leur traduction.',
          'Des étudiantes lisent à voix haute à plusieurs moments de la journée.',
          'Une boîte pour noter la phrase qui vous a arrêté.',
        ],
        artists: 'Toni Morrison, Virginia Woolf, Sylvia Plath, Maya Angelou, Margaret Atwood et les autres autrices.',
      },
      craft: {
        lead: 'Ciseaux, colle, vieux magazines. Vous repartez avec votre propre affiche.',
        howTo: [
          'On fournit papier, images, typographies découpées.',
          'Vous composez une affiche sur l’artiste de votre choix.',
          'Les meilleures seront affichées à la sortie, et peut-être sur notre Instagram.',
        ],
        artists: 'Toutes, au choix.',
      },
    },
  },
  en: {
    title: 'Workshops',
    description:
      'Music bingo, memory, Dobble, Guess Who?, a reading corner and a collage workshop: the six free workshops of Lady Gallery.',
    intro:
      'Six games and workshops to move from one room to the next without just reading wall labels. Free, no booking, in English and French.',
    howToTitle: 'How to play',
    artistsTitle: 'Featuring',
    note: 'Times for each workshop will be announced with the programme.',
    items: {
      bingo: {
        lead: 'We play a clip, you tick the artist on your card. Sometimes three seconds is enough.',
        howTo: [
          'Each player gets a card with sixteen artists.',
          'The host plays short clips in random order.',
          'First full line: shout “Lady!” and come and get it checked.',
        ],
        artists: 'Aretha Franklin, Billie Holiday, Ella Fitzgerald, Kate Bush, Amy Winehouse, Lorde and the other musicians.',
      },
      memory: {
        lead: 'Cards face down, paintings to match in pairs. The game makes you actually look.',
        howTo: [
          'All cards are laid face down.',
          'On your turn, flip two. Same painting: keep them and go again.',
          'At the end we ask who painted it. Bonus point if you know.',
        ],
        artists: 'Mary Cassatt, Emily Carr and the painters of room I.',
      },
      dobble: {
        lead: 'Any two cards share exactly one symbol. Here, the symbols are pieces of clothing.',
        howTo: [
          'A miniskirt, a punk corset, a wedding dress, a wrap dress.',
          'Flip a card: the first to name the shared symbol wins it.',
          'Each symbol comes from one designer, and we’ll tell you which.',
        ],
        artists: 'Vivienne Westwood, Mary Quant, Stella McCartney, Vera Wang, Claire McCardell.',
      },
      'guess-who': {
        lead: 'Classic Guess Who?, with actresses and directors on the board.',
        howTo: [
          'Each player secretly picks a woman.',
          'Ask yes-or-no questions: “Has she directed a film?”, “Has she played the Queen?”',
          'Flip down the faces until only one is left.',
        ],
        artists: 'Meryl Streep, Katharine Hepburn, Greta Gerwig, Judi Dench, Cate Blanchett, Jane Campion and the others.',
      },
      reading: {
        lead: 'A table, books, armchairs. Pick an excerpt, read it, leave a note if you like.',
        howTo: [
          'Short excerpts in English, with a French translation.',
          'Students read aloud at a few points during the day.',
          'A box to write down the line that stopped you.',
        ],
        artists: 'Toni Morrison, Virginia Woolf, Sylvia Plath, Maya Angelou, Margaret Atwood and the other writers.',
      },
      craft: {
        lead: 'Scissors, glue, old magazines. You leave with a poster of your own.',
        howTo: [
          'We provide paper, pictures and cut-out lettering.',
          'Make a poster about the artist of your choice.',
          'The best ones go up by the exit, and maybe on our Instagram.',
        ],
        artists: 'Any of them, your pick.',
      },
    },
  },
}

export const ABOUT_COPY: Record<Locale, { title: string; description: string; paragraphs: string[]; teamTitle: string; team: string }> = {
  fr: {
    title: 'À propos',
    description:
      'Lady Gallery est un projet d’étudiantes du département de langues de l’Université de Bordeaux autour des artistes femmes anglophones.',
    paragraphs: [
      'Lady Gallery est né dans un cours du département de langues de l’Université de Bordeaux. La consigne : monter un événement en lien avec le monde anglophone. On a choisi de parler des femmes qui y ont fait de l’art.',
      'La liste n’a rien d’exhaustif. Elle mélange des noms que tout le monde connaît et d’autres qu’on a découverts en préparant la journée. Chacune a sa page sur ce site, écrite à partir de sources que vous pouvez vérifier.',
      'Le jour J, il y aura des œuvres à regarder, des textes à lire, de la musique et six ateliers. L’entrée est libre, pour les étudiants comme pour le public.',
    ],
    teamTitle: 'L’équipe',
    team: 'Les noms de l’équipe arrivent bientôt. En attendant, écrivez-nous sur Instagram.',
  },
  en: {
    title: 'About',
    description:
      'Lady Gallery is a student project from the language department of the University of Bordeaux about English-speaking women artists.',
    paragraphs: [
      'Lady Gallery started in a class at the language department of the University of Bordeaux. The brief: put on an event connected to the English-speaking world. We chose to talk about the women who made art in it.',
      'The list is not meant to be complete. It mixes names everyone knows with some we discovered while preparing the day. Each of them has a page on this site, written from sources you can check.',
      'On the day there will be works to look at, texts to read, music and six workshops. Entry is free, for students and for the public.',
    ],
    teamTitle: 'The team',
    team: 'The team’s names are coming soon. In the meantime, message us on Instagram.',
  },
}

export const PARTNERS_COPY: Record<Locale, { title: string; description: string; paragraphs: string[]; cta: string }> = {
  fr: {
    title: 'Partenariats',
    description: 'Les partenaires de Lady Gallery et comment soutenir l’événement étudiant de l’Université de Bordeaux.',
    paragraphs: [
      'Nos partenaires seront annoncés ici dans les prochaines semaines.',
      'Librairie, disquaire, café, association, commerce bordelais : si vous voulez prêter du matériel, offrir des lots pour les ateliers ou simplement relayer l’événement, on serait ravies d’en parler.',
    ],
    cta: 'Nous écrire sur Instagram',
  },
  en: {
    title: 'Partners',
    description: 'The partners of Lady Gallery and how to support this University of Bordeaux student event.',
    paragraphs: [
      'Our partners will be announced here in the coming weeks.',
      'Bookshop, record shop, café, student society or local business: if you would like to lend equipment, offer prizes for the workshops or just help spread the word, we would love to talk.',
    ],
    cta: 'Message us on Instagram',
  },
}

export const NOT_FOUND_COPY: Record<Locale, { title: string; text: string; home: string; arts: string }> = {
  fr: {
    title: 'Cette salle est fermée',
    text: 'La page que vous cherchez n’existe pas ou a changé d’adresse.',
    home: 'Retour à l’accueil',
    arts: 'Voir les artistes',
  },
  en: {
    title: 'This room is closed',
    text: 'The page you are looking for does not exist or has moved.',
    home: 'Back to the home page',
    arts: 'See the artists',
  },
}
