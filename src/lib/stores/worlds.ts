import { writable } from 'svelte/store';
import { activeAccount, type Account } from './accounts';
import type { LimitedWord } from '$lib/api/vrchat';
import { getActiveWorlds, getRecentWorlds } from '$lib/api/vrchat/impl/worlds';

export const recentWorlds = writable<LimitedWord[]>([]);
export const activeWorlds = writable<LimitedWord[]>([]);

export const refreshRecentWorlds = async (account: Account | null) => {
	if (!account) {
		recentWorlds.set([]);
		return;
	}

	recentWorlds.set(await getRecentWorlds());
};

export const refreshActiveWorlds = async (account: Account | null) => {
	if (!account) {
		activeWorlds.set([]);
		return;
	}

	activeWorlds.set(await getActiveWorlds());
};

activeAccount.subscribe(async (account) => {
	refreshRecentWorlds(account);
	refreshActiveWorlds(account);
});
