import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const events = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    location: z.string(),
    city: z.enum(['almaty', 'astana', 'pavlodar']),
    format: z.string(),
    status: z.enum(['upcoming', 'past']),
    registrationUrl: z.string().url().optional(),
    lumaUrl: z.string().url().optional(),
    description: z.string(),
    lang: z.enum(['ru', 'kk', 'en']).default('ru'),
  }),
});

export const collections = { events };
