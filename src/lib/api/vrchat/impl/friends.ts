import { showToast } from '$lib/stores/toasts';
import { useClient } from '..';

export const getFriendsRange = (offset: number, n = 100, offline = true) =>
	useClient().GET('/auth/user/friends', { params: { query: { offset, n, offline } } });

export const getFriends = async (count: number, offline: boolean) => {
	const friends = [];

	for (let i = 0; i < count; i += 100) {
		const { data, error } = await getFriendsRange(i, 100, offline);

		if (!data) {
			showToast(`Failed fetching friends. ${error.error?.message}`, 'alert-error');
			return [];
		}

		friends.push(...data);
	}
	return friends;
};

export const getAllFriends = async () => {
	const { online, offline } = await getFriendCount();

	return (await getFriends(online, false)).concat(await getFriends(offline, true));
};

export const getFriendCount = async () => {
	const { data, error } = await useClient().GET('/auth/user');

	if (!data) {
		showToast(`Failed fetching friend count. ${error.error?.message}`, 'alert-error');
		return { online: 0, offline: 0 };
	}

	return {
		online: data.onlineFriends?.length ?? 0,
		offline: data.offlineFriends?.length ?? 0
	};
};
