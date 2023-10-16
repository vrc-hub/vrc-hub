import { useClient, type CurrentUser } from '..';

export const getSelfData = () => useClient().GET('/auth/user');

export const getSelfPicture = (user: CurrentUser) =>
	user.profilePicOverride || user.userIcon || user.currentAvatarThumbnailImageUrl;
