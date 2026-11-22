import type { Locale } from './routes'

type Faq = { question: string; answer: string }

export const FAQ_COPY: Record<Locale, { title: string; items: Faq[] }> = {
  fr: {
    title: 'Questions pratiques',
    items: [
      {
        question: 'Qu’est-ce que Lady Gallery ?',
        answer:
          'Une journée organisée par des étudiantes du département STC de l’Université Bordeaux Montaigne autour de 45 artistes femmes anglophones : peintres, autrices, musiciennes, actrices, réalisatrices et créatrices de mode.',
      },
      {
        question: 'Quand et où ?',
        answer:
          'Le 1er décembre 2026, de 11h à 13h30, à l’Université Bordeaux Montaigne, dans le hall de la CLEFF.',
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
          'A day run by students of the STC department of Bordeaux Montaigne University about 45 English-speaking women artists: painters, writers, musicians, actresses, directors and fashion designers.',
      },
      {
        question: 'When and where?',
        answer:
          'On 1 December 2026, from 11am to 1:30pm, at Bordeaux Montaigne University, in the CLEFF hall.',
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
