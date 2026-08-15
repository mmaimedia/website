import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    author: z.string().default('MMAI'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const videos = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    youtubeId: z.string(),
    duration: z.string().optional(),
    series: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const podcasts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    spotifyId: z.string(),
    duration: z.string().optional(),
    guests: z.array(z.string()).default([]),
    season: z.number().optional(),
    episode: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

const games = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    itchUrl: z.string().url(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    price: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, videos, podcasts, games };
