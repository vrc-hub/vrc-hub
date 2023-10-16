import type { Response } from '@tauri-apps/api/http';
import { useClient } from '..';

export type LoginResultSuccess = {
	result: 'success';
	auth: string;
};

export type LoginResultTwoFactor = {
	result: 'twofactor';
	types: TwoFactorType[];
	auth: string;
};

export type LoginResultError = {
	result: 'error';
	message: string;
};

export type LoginResult = LoginResultSuccess | LoginResultTwoFactor | LoginResultError;

export type TwoFactorType = 'totp' | 'otp' | 'emailotp';

export type TwoFactorResult = {
	result: 'success';
};

export const logIn = async (username: string, password: string): Promise<LoginResult> => {
	const { data, error, response } = await useClient().GET('/auth/user', {
		headers: {
			Accept: '*/*',
			Authorization: `Basic ${btoa(
				encodeURIComponent(username) + ':' + encodeURIComponent(password)
			)}`
		}
	});

	if (error) return { result: 'error', message: error.error?.message ?? 'Failed to log you in.' };

	const auth = extractAuthCookie(response);
	if (!auth) return { result: 'error', message: 'No auth cookie given by server.' };

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	const types = (data as any).requiresTwoFactorAuth;
	if (types && types.length) return { result: 'twofactor', types, auth };
	else return { result: 'success', auth };
};

export const twoFactor = async (code: string, type: TwoFactorType, auth: string) => {
  const {POST} = useClient();
	switch (type) {
		case 'totp':
		default:
			return (
				await POST('/auth/twofactorauth/totp/verify', {
					body: { code },
					headers: { Cookie: `auth=${auth}` }
				})
			).response;
		case 'otp':
			return (
				await POST('/auth/twofactorauth/otp/verify', {
					body: { code },
					headers: { Cookie: `auth=${auth}` }
				})
			).response;
		case 'emailotp':
			return (
				await POST('/auth/twofactorauth/emailotp/verify', {
					body: { code },
					headers: { Cookie: `auth=${auth}` }
				})
			).response;
	}
};

export const getUserData = (auth: string) => useClient().GET("/auth/user", {headers: {
  Cookie: `auth=${auth}`
}})

export const extractAuthCookie = (response: Response<unknown>) => parseAuthCookie(response.headers['set-cookie'].split(';'));

const parseAuthCookie = (cookies: string[]) => {
	for (const cookie of cookies) {
		const [name, value] = cookie.split('=');
		if (name === 'auth') return value;
	}
	return null;
};
