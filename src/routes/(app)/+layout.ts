import { activeAccount } from '$lib/stores/accounts';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { LayoutLoad } from '../$types';

export const load: LayoutLoad = () => {
	if (!get(activeAccount)) throw redirect(308, '/accounts');
};
