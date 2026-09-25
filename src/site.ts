/**
 * Single source of truth for the things that appear in several places.
 * Edit this first — name, links and navigation all read from here.
 */
import type { IconName } from './lib/icons';

export const SITE = {
	name: 'Kawaguchi Hikaru',
	familyName: 'Kawaguchi',
	givenName: 'Hikaru',
	initials: 'KH',
	tagline: 'Mathematics, machine learning & AI',
	description:
		'Kawaguchi Hikaru — final-year Mathematics and Computer Science student at the National University of Singapore, interested in data science, machine learning and AI.',
	location: 'Singapore',
	email: 'hikarukawa02@gmail.com',
	github: 'https://github.com/h7karu',
	linkedin: 'https://www.linkedin.com/in/hikaru-kawaguchi-80b98a312/',
} as const;

interface NavItem {
	label: string;
	href: string;
	/** Shown on the homepage cards. */
	blurb: string;
	icon: IconName;
}

/** The pages in the header, in order. */
export const NAV: NavItem[] = [
	{ label: 'About', href: '/about/', blurb: 'A bit more about me, and the tools I work with.', icon: 'user' },
	{ label: 'Experience', href: '/experience/', blurb: 'Data science internships at Razer and Wego.', icon: 'briefcase' },
	{ label: 'Projects', href: '/projects/', blurb: 'Machine learning, trading research and a chess CNN.', icon: 'code' },
	{ label: 'Competitions', href: '/competitions/', blurb: 'Trading competitions and mathematical olympiads.', icon: 'trophy' },
	{ label: 'Education', href: '/education/', blurb: 'NUS, Temasek Junior College and my coursework.', icon: 'cap' },
	{ label: 'Hobbies', href: '/hobbies/', blurb: 'Chess, cubing, card games and a lot of sport.', icon: 'knight' },
];

/** Reading order for the previous / next links at the bottom of each page. */
export const PAGES = [
	{ label: 'Home', href: '/' },
	...NAV.map(({ label, href }) => ({ label, href })),
	{ label: 'Contact', href: '/contact/' },
];
