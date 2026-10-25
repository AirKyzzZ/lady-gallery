import type { CategoryKey } from '../data/taxonomy'
import type { Locale } from './routes'

export const ROOM_LABEL: Record<Locale, string> = { fr: 'Salle', en: 'Room' }

export const ARTS_INDEX_COPY: Record<Locale, { title: string; description: string; intro: string }> = {
  fr: {
    title: 'Les arts',
    description:
      'Les 45 artistes anglophones de Lady Gallery, réparties en cinq salles : arts visuels, littérature, musique, cinéma et théâtre, mode.',
    intro:
      'Cinq salles, quarante-cinq femmes. Commencez par celle que vous connaissez, finissez par celle que vous découvrez.',
  },
  en: {
    title: 'The arts',
    description:
      'The 45 English-speaking women of Lady Gallery, in five rooms: visual arts, literature, music, film and theatre, fashion.',
    intro: 'Five rooms, forty-five women. Start with the one you know, end with the one you just discovered.',
  },
}

export const CATEGORY_COPY: Record<CategoryKey, Record<Locale, { intro: string; description: string }>> = {
  'visual-arts': {
    fr: {
      intro:
        'Des fleurs géantes d’O’Keeffe au lit défait de Tracey Emin, des araignées de Louise Bourgeois aux autoportraits déguisés de Cindy Sherman : peinture, sculpture et photographie.',
      description:
        'Peintres, sculptrices et photographes anglophones de Lady Gallery : Georgia O’Keeffe, Mary Cassatt, Louise Bourgeois, Dorothea Lange et d’autres.',
    },
    en: {
      intro:
        'From O’Keeffe’s giant flowers to Tracey Emin’s unmade bed, from Louise Bourgeois’s spiders to Cindy Sherman’s disguised self-portraits: painting, sculpture and photography.',
      description:
        'The painters, sculptors and photographers of Lady Gallery: Georgia O’Keeffe, Mary Cassatt, Louise Bourgeois, Dorothea Lange and more.',
    },
  },
  literature: {
    fr: {
      intro:
        'Des romans policiers, des journaux intimes, des poèmes lus à une investiture présidentielle. Dix autrices, de l’Angleterre à l’Afrique du Sud en passant par le Canada et l’Australie.',
      description:
        'Romancières et poétesses anglophones de Lady Gallery : Toni Morrison, Virginia Woolf, Agatha Christie, Margaret Atwood, Sylvia Plath, Maya Angelou.',
    },
    en: {
      intro:
        'Detective novels, essays, poems read at a presidential inauguration. Ten writers, from England to South Africa by way of Canada and Australia.',
      description:
        'The novelists and poets of Lady Gallery: Toni Morrison, Virginia Woolf, Agatha Christie, Margaret Atwood, Sylvia Plath, Maya Angelou and more.',
    },
  },
  music: {
    fr: {
      intro:
        'Du jazz des années 1930 à la pop d’aujourd’hui. Treize voix, dont deux duos qu’on a voulu mettre face à face.',
      description:
        'Les musiciennes de Lady Gallery : Aretha Franklin, Billie Holiday, Ella Fitzgerald, Kate Bush, Amy Winehouse, Joni Mitchell, Rihanna et d’autres.',
    },
    en: {
      intro: 'From 1930s jazz to today’s pop. Thirteen voices, including two pairs we wanted to put side by side.',
      description:
        'The musicians of Lady Gallery: Aretha Franklin, Billie Holiday, Ella Fitzgerald, Kate Bush, Amy Winehouse, Joni Mitchell, Rihanna and more.',
    },
  },
  film: {
    fr: {
      intro:
        'Des actrices qui ont tenu la scène londonienne pendant soixante ans, et des réalisatrices qui ont gagné des Oscars et des Palmes d’or.',
      description:
        'Actrices et réalisatrices anglophones de Lady Gallery : Meryl Streep, Katharine Hepburn, Greta Gerwig, Kathryn Bigelow, Jane Campion et d’autres.',
    },
    en: {
      intro:
        'Actresses who held the London stage for sixty years, and directors who won Oscars and the Palme d’Or.',
      description:
        'The actresses and directors of Lady Gallery: Meryl Streep, Katharine Hepburn, Greta Gerwig, Kathryn Bigelow, Jane Campion and more.',
    },
  },
  fashion: {
    fr: {
      intro:
        'La minijupe, le punk, la robe de mariée noire, la robe portefeuille des années 1940. Cinq créatrices et ce qu’elles ont fait porter.',
      description:
        'Les créatrices de mode de Lady Gallery : Vivienne Westwood, Mary Quant, Stella McCartney, Vera Wang et Claire McCardell.',
    },
    en: {
      intro:
        'The miniskirt, punk, the black wedding dress, the 1940s wrap dress. Five designers and what they got people to wear.',
      description:
        'The fashion designers of Lady Gallery: Vivienne Westwood, Mary Quant, Stella McCartney, Vera Wang and Claire McCardell.',
    },
  },
}
