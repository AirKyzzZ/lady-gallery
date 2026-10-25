export type TitlePart = { text: string; lang?: 'en' | 'fr' }

export const splitFrenchWorkTitle = (frTitle: string, enTitles: readonly string[]): TitlePart[] => {
  if (enTitles.includes(frTitle)) return [{ text: frTitle, lang: 'en' }]
  const original = enTitles.find((en) => frTitle.startsWith(`${en} (`) && frTitle.endsWith(')'))
  if (!original) return [{ text: frTitle }]
  return [
    { text: original, lang: 'en' },
    { text: ` (${frTitle.slice(original.length + 2, -1)})` },
  ]
}
