const MONTH_YEAR = new Intl.DateTimeFormat('en-US', {
	month: 'short',
	year: 'numeric',
	timeZone: 'UTC',
});

/** "Mar 2023" */
export function formatMonth(date: Date): string {
	return MONTH_YEAR.format(date);
}

/** "Mar 2023 — Present" */
export function formatRange(start: Date, end?: Date): string {
	return `${formatMonth(start)} — ${end ? formatMonth(end) : 'Present'}`;
}

/** "6 months", counting both the start and end month. */
export function formatDuration(start: Date, end: Date = new Date()): string {
	const months =
		(end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
		(end.getUTCMonth() - start.getUTCMonth()) +
		1;
	if (months < 12) return `${months} month${months === 1 ? '' : 's'}`;
	const years = Math.floor(months / 12);
	const rest = months % 12;
	return `${years} yr${rest ? ` ${rest} mo` : ''}`;
}

/** Machine-readable value for <time datetime="…">. */
export function isoDate(date: Date): string {
	return date.toISOString().slice(0, 10);
}
