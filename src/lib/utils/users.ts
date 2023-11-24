import type { CurrentUser, LimitedUser } from '$lib/api/vrchat';
import contributors from './contributors';
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

export const getStatus = (user: LimitedUser | CurrentUser) =>
	user.statusDescription || capitalize(user.status);

export type TrustRank =
	| 'Troll'
	| 'Visitor'
	| 'New User'
	| 'User'
	| 'Known User'
	| 'Trusted User'
	| 'Veteran';
export const getTrustRank = (user: LimitedUser | CurrentUser): TrustRank => {
	if (user.tags.includes('system_trust_legend')) return 'Veteran';
	else if (user.tags.includes('system_trust_veteran')) return 'Trusted User';
	else if (user.tags.includes('system_trust_trusted')) return 'Known User';
	else if (user.tags.includes('system_trust_known')) return 'User';
	else if (user.tags.includes('system_trust_basic')) return 'New User';
	else if (user.tags.includes('system_probable_troll') || user.tags.includes('system_troll'))
		return 'Troll';
	else return 'Visitor';
};

export const isModerator = (user: LimitedUser | CurrentUser) =>
	user.tags.includes('admin_moderator');
export const isContributor = (user: LimitedUser | CurrentUser) => contributors.includes(user.id);
export const hasVRCPlus = (user: LimitedUser | CurrentUser) =>
	user.tags.includes('system_supporter');

export const nameSort = (u1: LimitedUser | CurrentUser, u2: LimitedUser | CurrentUser) =>
	u1.displayName.localeCompare(u2.displayName);
