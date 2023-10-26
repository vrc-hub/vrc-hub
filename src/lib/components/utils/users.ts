import type { CurrentUser, LimitedUser } from '$lib/api/vrchat';
import { capitalize } from './text';

export const getPicture = (user: LimitedUser | CurrentUser) =>
	user.profilePicOverride || user.currentAvatarImageUrl;
export const getIcon = (user: LimitedUser | CurrentUser) => user.userIcon || getPicture(user);
export const getThumbnail = (path: string) => {
	const matches = path.match(/file_([a-f0-9-]+)/);
	return matches && matches.length > 0
		? `https://api.vrchat.cloud/api/1/image/${matches[0]}/1/256`
		: path;
};

export const getDescription = (user: LimitedUser | CurrentUser) =>
	user.statusDescription || capitalize(user.status);

export const nameSort = (u1: LimitedUser | CurrentUser, u2: LimitedUser | CurrentUser) =>
	u1.displayName.localeCompare(u2.displayName);
