import { persisted } from 'svelte-persisted-store';

export type Account = {
	identifier: string;
	accessToken: string;
};

export const accounts = persisted<Account[]>('accounts', []);

export const activeAccount = persisted<Account | null>('activeAccount', null);
