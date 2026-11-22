import type { WorkshopGroup, WorkshopKey } from '../data/event'
import type { PartnerKey, PartnerRole } from '../data/partners'
import type { Locale } from './routes'

type Workshop = { players?: string; duration?: string; steps: string[]; outro?: string }

type WorkshopsCopy = {
  title: string
  description: string
  intro: string
  groups: Record<WorkshopGroup, { title: string; note: string }>
  playersLabel: string
  durationLabel: string
  related: (room: string) => string
  items: Record<WorkshopKey, Workshop>
}

export const WORKSHOPS_COPY: Record<Locale, WorkshopsCopy> = {
  fr: {
    title: 'Ateliers',
    description:
      'Qui est-ce ?, Dobble, Memory, coin lecture, atelier sculpture, bingo musical et pause gourmande : le programme gratuit de Lady Gallery.',
    intro: 'Six ateliers gratuits pour découvrir les artistes en jouant, et une pause gourmande. Sans inscription.',
    groups: {
      games: { title: 'Jeux', note: 'Libres d’accès, de 11h à 13h30' },
      stands: { title: 'Stands', note: 'Libres d’accès, de 11h à 13h30' },
      slot: { title: 'Rendez-vous', note: 'De 12h45 à 13h30' },
    },
    playersLabel: 'Joueurs',
    durationLabel: 'Durée',
    related: (room) => `Salle liée : ${room}`,
    items: {
      'guess-who': {
        players: 'Seul ou en équipe de 2 à 3',
        duration: '5 à 10 minutes par manche',
        steps: [
          'Avec l’animatrice ou seul, choisissez secrètement un film parmi les 24 proposés.',
          'Posez des questions auxquelles on ne peut répondre que par « oui » ou « non ».',
          'Éliminez progressivement les films qui ne correspondent pas.',
          'Après 5 questions sans réponse, un indice vous sera donné.',
          'Après la 6e question, vous devrez proposer une réponse !',
          'Attention : une mauvaise réponse vous élimine.',
        ],
        outro: 'Le premier à trouver le film mystère remportera un petit lot !',
      },
      dobble: {
        players: '2 à 6 joueurs',
        steps: [
          'Observez attentivement les cartes.',
          'Repérez le symbole commun entre les deux cartes.',
          'Annoncez le symbole à voix haute le plus rapidement possible.',
          'Récupérez les cartes selon les règles de la partie.',
          'Le joueur qui possède le plus de cartes à la fin gagne !',
        ],
        outro:
          'Découvrez également les petites fiches explicatives pour connaître l’histoire des symboles de mode et leur lien avec l’émancipation des femmes.',
      },
      memory: {
        players: '2 à 4 joueurs',
        steps: [
          'Les 24 cartes (12 paires) sont placées face cachée.',
          'À tour de rôle, retournez deux cartes.',
          'Si les deux cartes sont identiques, gardez la paire et rejouez.',
          'Si elles sont différentes, retournez-les et laissez jouer la personne suivante.',
          'Continuez jusqu’à ce que toutes les paires soient retrouvées.',
        ],
        outro:
          'Le joueur qui possède le plus de paires remporte la partie ! Une affiche vous permettra également de découvrir les 12 artistes et leurs œuvres.',
      },
      reading: {
        steps: [
          'Parcourez les livres présentés sur la table.',
          'Découvrez les recommandations de l’équipe pour chaque ouvrage.',
          'Lisez les petites fiches pour connaître l’histoire du livre et savoir à qui il pourrait plaire.',
          'N’hésitez pas à feuilleter les ouvrages.',
          'Laissez votre avis, un commentaire ou une impression sur un post-it !',
        ],
        outro: 'Découvrez des autrices anglophones des XXe et XXIe siècles.',
      },
      craft: {
        players: '8 personnes à la fois',
        steps: [
          'Prenez votre portion de pâte autodurcissante.',
          'Créez librement : un visage, un objet, une forme abstraite ou une petite figurine.',
          'N’hésitez pas à demander conseil aux animatrices.',
          'Une fois votre création terminée, indiquez votre prénom sur le sachet prévu.',
        ],
        outro: 'Vous pouvez repartir avec votre sculpture ! Attention : la pâte doit sécher chez vous.',
      },
      snack: {
        steps: [
          'Découvrez les gourmandises proposées sur notre stand.',
          'Retrouvez des cookies, brownies, muffins, bonbons, chocolats ou spécialités des pays anglophones.',
          'Profitez de ce petit moment convivial pendant votre visite !',
        ],
        outro: 'Bon appétit et bonne découverte !',
      },
      bingo: {
        players: 'Seul ou en groupe de 2 à 3',
        steps: [
          'Récupérez une grille de bingo de 25 cases (5 × 5) et un crayon.',
          'Écoutez attentivement les extraits musicaux d’environ 5 secondes.',
          'Lorsqu’une chanson ou son interprète apparaît sur votre grille, cochez la case correspondante.',
          'Le premier à compléter une colonne entière doit crier « BINGO ! ».',
          'Une animatrice vérifiera votre grille avec la liste des extraits.',
        ],
        outro:
          'Si toutes vos réponses sont correctes, vous remportez un lot pour votre groupe ! De nouvelles grilles seront distribuées à chaque nouvelle partie.',
      },
    },
  },
  en: {
    title: 'Workshops',
    description:
      'Who’s This?, Dobble, Memory, a reading corner, a sculpture workshop, music bingo and a snack break: the free programme of Lady Gallery.',
    intro: 'Six free workshops to discover the artists through play, plus a snack break. No booking needed.',
    groups: {
      games: { title: 'Games', note: 'Drop in any time, 11am to 1:30pm' },
      stands: { title: 'Stands', note: 'Drop in any time, 11am to 1:30pm' },
      slot: { title: 'Fixed slot', note: '12:45 to 1:30pm' },
    },
    playersLabel: 'Players',
    durationLabel: 'Length',
    related: (room) => `Related room: ${room}`,
    items: {
      'guess-who': {
        players: 'On your own or in teams of 2 or 3',
        duration: '5 to 10 minutes a round',
        steps: [
          'With the host or on your own, secretly pick one film out of the 24 on the board.',
          'Ask questions that can only be answered with “yes” or “no”.',
          'Rule out the films that don’t fit, one by one.',
          'After 5 questions without the answer, you get a clue.',
          'After the 6th question, you have to make a guess!',
          'Careful: a wrong answer knocks you out.',
        ],
        outro: 'The first to find the mystery film wins a small prize!',
      },
      dobble: {
        players: '2 to 6 players',
        steps: [
          'Look closely at the cards.',
          'Spot the one symbol two cards have in common.',
          'Call it out as fast as you can.',
          'Collect the cards according to the rules of the round.',
          'Whoever holds the most cards at the end wins!',
        ],
        outro: 'Read the little cards next to the game to learn the story of each fashion symbol and how it ties in with women’s emancipation.',
      },
      memory: {
        players: '2 to 4 players',
        steps: [
          'The 24 cards (12 pairs) are laid face down.',
          'Take turns flipping two cards.',
          'If they match, keep the pair and play again.',
          'If they don’t, turn them back over and let the next person play.',
          'Keep going until every pair has been found.',
        ],
        outro: 'Whoever has the most pairs wins! A poster also introduces the 12 artists and their works.',
      },
      reading: {
        steps: [
          'Browse the books laid out on the table.',
          'Read the team’s recommendation for each one.',
          'Check the little cards to learn the story behind each book and who might like it.',
          'Feel free to leaf through them.',
          'Leave your opinion, a comment or a first impression on a sticky note!',
        ],
        outro: 'Discover English-speaking women writers of the 20th and 21st centuries.',
      },
      craft: {
        players: '8 people at a time',
        steps: [
          'Take your share of air-dry clay.',
          'Make whatever you like: a face, an object, an abstract shape or a small figure.',
          'Ask the hosts for tips any time.',
          'When you are done, write your first name on the bag provided.',
        ],
        outro: 'You can take your sculpture home! Note: the clay finishes drying at your place.',
      },
      snack: {
        steps: [
          'Have a look at the treats on our stand.',
          'Cookies, brownies, muffins, sweets, chocolate and specialities from English-speaking countries.',
          'Enjoy a friendly little break during your visit!',
        ],
        outro: 'Enjoy, and happy exploring!',
      },
      bingo: {
        players: 'On your own or in groups of 2 or 3',
        steps: [
          'Pick up a bingo card with 25 squares (5 × 5) and a pencil.',
          'Listen closely to music clips of about 5 seconds.',
          'When a song or its singer is on your card, tick the square.',
          'The first to fill a whole column shouts “BINGO!”.',
          'A host checks your card against the list of clips.',
        ],
        outro: 'If all your answers are right, your group wins a prize! New cards are handed out for every round.',
      },
    },
  },
}

export const ABOUT_COPY: Record<Locale, { title: string; description: string; paragraphs: string[]; teamTitle: string; team: string }> = {
  fr: {
    title: 'À propos',
    description:
      'Lady Gallery est un projet d’étudiantes du département STC de l’Université Bordeaux Montaigne autour des artistes femmes anglophones.',
    paragraphs: [
      'Lady Gallery est né dans un cours du département STC de l’Université Bordeaux Montaigne. La consigne : monter un événement en lien avec le monde anglophone. On a choisi de parler des femmes qui y ont fait de l’art.',
      'La liste n’a rien d’exhaustif. Elle mélange des noms que tout le monde connaît et d’autres qu’on a découverts en préparant la journée. Chacune a sa page sur ce site, écrite à partir de sources que vous pouvez vérifier.',
      'Le jour J, il y aura des œuvres à regarder, des textes à lire, de la musique et six ateliers. L’entrée est libre, pour les étudiants comme pour le public.',
    ],
    teamTitle: 'L’équipe',
    team: 'Les noms de l’équipe arrivent bientôt. En attendant, écrivez-nous sur Instagram.',
  },
  en: {
    title: 'About',
    description:
      'Lady Gallery is a student project from the STC department of Bordeaux Montaigne University about English-speaking women artists.',
    paragraphs: [
      'Lady Gallery started in a class at the STC department of Bordeaux Montaigne University. The brief: put on an event connected to the English-speaking world. We chose to talk about the women who made art in it.',
      'The list is not meant to be complete. It mixes names everyone knows with some we discovered while preparing the day. Each of them has a page on this site, written from sources you can check.',
      'On the day there will be works to look at, texts to read, music and six workshops. Entry is free, for students and for the public.',
    ],
    teamTitle: 'The team',
    team: 'The team’s names are coming soon. In the meantime, message us on Instagram.',
  },
}

type PartnersCopy = {
  title: string
  description: string
  intro: string
  groups: Record<PartnerRole, string>
  blurbs: Record<PartnerKey, string>
  contact: string
  cta: string
}

export const PARTNERS_COPY: Record<Locale, PartnersCopy> = {
  fr: {
    title: 'Partenariats',
    description: 'ISIC Rider, Fnac, Krazy Kat, Book Lovers et Utopia : les partenaires qui relaient Lady Gallery et offrent les lots.',
    intro: 'Merci à celles et ceux qui font vivre la journée, en parlant de l’événement ou en offrant les lots des ateliers.',
    groups: { relay: 'Relais de l’événement', prizes: 'Ils offrent les lots' },
    blurbs: {
      'isic-rider': 'Le bureau des étudiants de l’ISIC, qui relaie l’événement.',
      fnac: 'Livres, musique, jeux : l’enseigne culturelle.',
      'krazy-kat': 'Librairie BD et café à Bordeaux.',
      'book-lovers': 'Librairie bordelaise dédiée à la romance.',
      utopia: 'Cinéma art et essai de Bordeaux, place Camille Jullian.',
    },
    contact: 'Vous voulez soutenir Lady Gallery ? Écrivez-nous.',
    cta: 'Nous écrire sur Instagram',
  },
  en: {
    title: 'Partners',
    description: 'ISIC Rider, Fnac, Krazy Kat, Book Lovers and Utopia: the partners who spread the word about Lady Gallery and give the prizes.',
    intro: 'Thank you to everyone who makes the day happen, by spreading the word or giving prizes for the workshops.',
    groups: { relay: 'Spreading the word', prizes: 'They give the prizes' },
    blurbs: {
      'isic-rider': 'The ISIC student union, spreading the word about the event.',
      fnac: 'Books, music and games: the culture retailer.',
      'krazy-kat': 'Comic book shop and café in Bordeaux.',
      'book-lovers': 'Bordeaux bookshop devoted to romance.',
      utopia: 'Art-house cinema in Bordeaux, place Camille Jullian.',
    },
    contact: 'Want to support Lady Gallery? Get in touch.',
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
