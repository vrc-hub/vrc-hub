import { derived, get } from 'svelte/store';
import createClient from '../client';
import type { paths, components } from './spec';
import { activeAccount } from '$lib/stores/accounts';

export const client = derived(activeAccount, ($activeAccount) => createClient<paths>({
	baseUrl: 'https://api.vrchat.cloud/api/1',
	headers: {
		'User-Agent': 'VRCHub',
    'Cookie': `auth=${$activeAccount?.accessToken ?? "none"}`
	}
}))

export const useClient = () => get(client);

export type CurrentUser = components["schemas"]["CurrentUser"];
export type LimitedUser = components["schemas"]["LimitedUser"];
