import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const WORKSHOP_KEYS = ['bingo', 'memory', 'dobble', 'guess-who', 'reading', 'craft'] as const

const bios = defineCollection({
  loader: glob({ pattern: '{fr,en}/*.md', base: './src/content/bios' }),
  schema: z.object({
    lede: z.string().min(40).max(160),
    works: z
      .array(z.object({ title: z.string(), year: z.string().optional(), kind: z.string() }))
      .min(2)
      .max(4),
    whyHere: z.string(),
    workshop: z.enum(WORKSHOP_KEYS).optional(),
    people: z.array(z.object({ name: z.string(), description: z.string() })).optional(),
  }),
})

export const collections = { bios }
