import createClient from '../client';
import type { paths } from './spec';

export const { GET, PUT, POST, DELETE, OPTIONS, HEAD, PATCH, TRACE } = createClient<paths>({
	baseUrl: 'https://api.vrchat.cloud/api/1',
	headers: {
		'User-Agent': 'VRCHub'
	}
});
