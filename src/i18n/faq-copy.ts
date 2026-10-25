import type { Locale } from './routes'

type Faq = { question: string; answer: string }

export const FAQ_COPY: Record<Locale, { title: string; items: Faq[] }> = {
  fr: {
    title: 'Questions pratiques',
    items: [
      {
        question: 'Qu’est-ce que Lady Gallery ?',
        answer:
          'Une journée organisée par des étudiantes du département de langues de l’Université de Bordeaux autour de 45 artistes femmes anglophones : peintres, autrices, musiciennes, actrices, réalisatrices et créatrices de mode.',
      },
      {
        question: 'Quand et où ?',
        answer:
          'Au printemps 2027, à l’Université de Bordeaux. La date, les horaires et la salle exacte sont encore à confirmer. On les annonce ici et sur Instagram dès qu’ils sont fixés.',
      },
      {
        question: 'C’est payant ?',
        answer: 'Non. L’entrée et les six ateliers sont gratuits, sans inscription.',
      },
      {
        question: 'Faut-il parler anglais ?',
        answer:
          'Non. Les textes sont en français et en anglais, et les ateliers se font dans les deux langues. Venir avec un anglais de lycée suffit largement.',
      },
      {
        question: 'C’est réservé aux étudiants ?',
        answer: 'Non, l’événement est ouvert à tout le monde : étudiants, personnel de l’université et grand public.',
      },
    ],
  },
  en: {
    title: 'Practical questions',
    items: [
      {
        question: 'What is Lady Gallery?',
        answer:
          'A day run by students of the language department of the University of Bordeaux about 45 English-speaking women artists: painters, writers, musicians, actresses, directors and fashion designers.',
      },
      {
        question: 'When and where?',
        answer:
          'In spring 2027, at the University of Bordeaux. The exact date, times and room are still to be confirmed. We will post them here and on Instagram as soon as they are set.',
      },
      {
        question: 'Does it cost anything?',
        answer: 'No. Entry and all six workshops are free, with no booking.',
      },
      {
        question: 'Do I need to speak French?',
        answer: 'No. Texts are in French and English, and the workshops run in both languages.',
      },
      {
        question: 'Is it only for students?',
        answer: 'No, it is open to everyone: students, university staff and the general public.',
      },
    ],
  },
}
