// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

/**
 * Wraps every markdown <table> in <div class="table-wrap"> so wide tables
 * scroll sideways on phones instead of stretching the page.
 * @type {import('satteri').HastPluginDefinition}
 */
const wrapTables = {
	name: 'wrap-tables',
	element: {
		filter: ['table'],
		visit(node, ctx) {
			ctx.wrapNode(node, {
				type: 'element',
				tagName: 'div',
				properties: { className: ['table-wrap'] },
				children: [],
			});
		},
	},
};

// https://astro.build/config
export default defineConfig({
	site: 'https://h7karu.github.io',

	markdown: {
		processor: satteri({ hastPlugins: [wrapTables] }),
	},

	// Self-hosted at build time: no requests to Google, no layout shift.
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-sans',
			weights: [400, 500, 600, 700],
			styles: ['normal'],
			subsets: ['latin'],
		},
		{
			provider: fontProviders.google(),
			name: 'Instrument Serif',
			cssVariable: '--font-serif',
			weights: [400],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
		},
		{
			provider: fontProviders.google(),
			name: 'JetBrains Mono',
			cssVariable: '--font-code',
			weights: [400, 500],
			styles: ['normal'],
			subsets: ['latin'],
		},
	],
});
