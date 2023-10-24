import { showToast } from '$lib/stores/toasts';
import { useClient } from '..';

export const getFriendsRange = (offset: number, n = 100, offline = true) =>
	useClient().GET('/auth/user/friends', { params: { query: { offset, n, offline } } });

export const getFriends = async () => {
	const count = await getFriendCount();
	const friends = [];

	for (let i = 0; i < count; i += 100) {
		const { data, error } = await getFriendsRange(i);

		if (!data) {
			showToast(`Failed fetching friends. ${error.error?.message}`, 'alert-error');
			return [];
		}

		friends.push(...data);
	}

	return friends;
};

export const getFriendCount = async () => {
	const { data, error } = await useClient().GET('/auth/user');

	if (!data) {
		showToast(`Failed fetching friend count. ${error.error?.message}`, 'alert-error');
		return 0;
	}

	return (data.onlineFriends?.length ?? 0) + (data.offlineFriends?.length ?? 0);
};
