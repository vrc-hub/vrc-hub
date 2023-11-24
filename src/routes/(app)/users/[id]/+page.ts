import { useClient } from '$lib/api/vrchat';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const userRequest = useClient()
		.GET('/users/{userId}', {
			params: { path: { userId: params.id } }
		})
		.then((request) => {
			if (request.error) {
				throw error(
					404,
					'User with the given ID is not found or you do not have the permissions to view this profile.'
				);
			}
			return request;
		});
	const worldsRequest = useClient().GET('/worlds', { params: { query: { userId: params.id } } });
	return {
		user: (await userRequest).data,
		worlds: (await worldsRequest).data || []
	};
};
