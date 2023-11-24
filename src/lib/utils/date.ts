export const getDaysBetween = (from: Date, to: Date) =>
	Math.round((to.getTime() - from.getTime()) / (1000 * 3600 * 24));
export const getDaysSince = (from: Date) => getDaysBetween(from, new Date());
