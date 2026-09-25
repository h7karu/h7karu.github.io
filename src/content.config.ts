import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const experience = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
	schema: z.object({
		role: z.string(),
		org: z.string(),
		orgUrl: z.url().optional(),
		/** One line on what the organisation does. */
		orgBlurb: z.string().optional(),
		location: z.string().optional(),
		start: z.coerce.date(),
		/** Leave unset for a role you currently hold — it renders as "Present". */
		end: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		year: z.number(),
		/** Where it came from, e.g. "TikTok TechJam 2026" or "Personal project". */
		context: z.string(),
		team: z.string().optional(),
		role: z.string().optional(),
		/** Headline numbers shown on the card and at the top of the write-up. */
		metrics: z
			.array(z.object({ value: z.string(), label: z.string() }))
			.max(3)
			.default([]),
		tags: z.array(z.string()).default([]),
		repo: z.url().optional(),
		url: z.url().optional(),
		/** Which illustration to draw — see src/components/ProjectArt.astro. */
		art: z.enum(['spectrum', 'spread', 'board']),
		/** Lower numbers come first. */
		order: z.number().default(100),
	}),
});

export const collections = { experience, projects };
