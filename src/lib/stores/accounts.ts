import { persisted } from 'svelte-persisted-store';
import { derived } from 'svelte/store';

export type Account = {
	identifier: string;
	accessToken: string;
	thumbnail?: string;
};

export const accounts = persisted<Account[]>('accounts', []);
export const activeAccount = persisted<number | null>('activeAccount', null);

export const currentAccount = derived([accounts, activeAccount], ($values, set) => {
	set($values[0][$values[1] ?? -1]);
});
