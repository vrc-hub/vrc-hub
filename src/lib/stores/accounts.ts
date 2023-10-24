import { persisted } from 'svelte-persisted-store';
import { get } from 'svelte/store';

export type Account = {
	identifier: string;
	accessToken: string;
};

export const accounts = persisted<Account[]>('accounts', []);

export const activeAccount = persisted<Account | null>('activeAccount', null);

export const getActiveAccount = () => get(activeAccount);

export const resetActiveAccount = () => activeAccount.set(null);
