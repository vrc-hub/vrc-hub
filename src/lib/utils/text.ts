export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

export const formatNumber = (number: number) =>
	new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(number);
export const formatDate = (date: Date) => date.toLocaleDateString();
export const formatTime = (date: Date) => date.toLocaleTimeString();
