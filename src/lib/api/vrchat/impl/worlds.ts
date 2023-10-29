import { showToast } from '$lib/stores/toasts';
import { useClient } from '..';

export const getRecentWorlds = async () => {
	const { data, error } = await useClient().GET('/worlds/recent');

	if (!data) {
		showToast(`Failed fetching recent worlds. ${error.error?.message}`, 'alert-error');
		return [];
	}

	return data;
};

export const getActiveWorlds = async () => {
	const { data, error } = await useClient().GET('/worlds/active');

	if (!data) {
		showToast(`Failed fetching active worlds. ${error.error?.message}`, 'alert-error');
		return [];
	}

	return data;
};
