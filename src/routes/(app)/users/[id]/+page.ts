import { useClient } from '$lib/api/vrchat';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const { data, error: err } = await useClient().GET('/users/{userId}', {
		params: { path: { userId: params.id } }
	});
	if (err) {
		throw error(404, 'User with given ID not found or unauthorized to fetch this user.');
	}
	return {
		friend: data
	};
};
