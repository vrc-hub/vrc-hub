import { writable } from 'svelte/store';
import type { LimitedUser } from '$lib/api/vrchat';
import { getAllFriends } from '$lib/api/vrchat/impl/friends';
import { activeAccount, type Account } from './accounts';

export const friends = writable<LimitedUser[]>([]);

export const refreshFriends = async (account: Account | null) => {
	if (!account) {
		friends.set([]);
		return;
	}

	friends.set(await getAllFriends());
};

activeAccount.subscribe(async (account) => refreshFriends(account));
