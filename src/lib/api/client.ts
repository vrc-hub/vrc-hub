import {
	Body,
	fetch,
	type FetchOptions as TauriFetchOptions,
	type RequestOptions as TauriRequestOptions
} from '@tauri-apps/api/http';
import type {
	ErrorResponse,
	HttpMethod,
	SuccessResponse,
	FilterKeys,
	MediaType,
	PathsWithMethod,
	ResponseObjectMap,
	OperationRequestBodyContent,
	HasRequiredKeys
} from 'openapi-typescript-helpers';

// Note: though "any" is considered bad practice in general, this library relies
// on "any" for type inference only it can give.  Same goes for the "{}" type.
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */

const DEFAULT_HEADERS = {
	'Content-Type': 'application/json'
};

/** options for each client instance */
interface ClientOptions extends Omit<TauriRequestOptions, 'headers' | 'method'> {
	/** set the common root URL for all API requests */
	baseUrl?: string;
	/** global querySerializer */
	querySerializer?: QuerySerializer<unknown>;
	/** global bodySerializer */
	bodySerializer?: BodySerializer<Body>;
	// headers override to make typing friendlier
	headers?: HeadersOptions;
}

export type HeadersOptions = Record<string, string | number | boolean | null | undefined>;

export type QuerySerializer<T> = (
	query: T extends { parameters: any }
		? NonNullable<T['parameters']['query']>
		: Record<string, unknown>
) => string;

export type BodySerializer<T> = (body: OperationRequestBodyContent<T>) => any;

export interface DefaultParamsOption {
	params?: { query?: Record<string, unknown> };
}

export type ParamsOption<T> = T extends { parameters: any }
	? HasRequiredKeys<T['parameters']> extends never
		? { params?: T['parameters'] }
		: { params: T['parameters'] }
	: DefaultParamsOption;
// v7 breaking change: TODO uncomment for openapi-typescript@7 support
// : never;

export type RequestBodyOption<T> = OperationRequestBodyContent<T> extends never
	? { body?: never }
	: undefined extends OperationRequestBodyContent<T>
	? { body?: OperationRequestBodyContent<T> }
	: { body: OperationRequestBodyContent<T> };

export type FetchOptions<T> = RequestOptions<T> & Omit<TauriFetchOptions, 'body'>;

export type FetchResponse<T> =
	| {
			data: FilterKeys<SuccessResponse<ResponseObjectMap<T>>, MediaType>;
			error?: never;
			response: Response;
	  }
	| {
			data?: never;
			error: FilterKeys<ErrorResponse<ResponseObjectMap<T>>, MediaType>;
			response: Response;
	  };

export type RequestOptions<T> = ParamsOption<T> &
	RequestBodyOption<T> & {
		querySerializer?: QuerySerializer<T>;
		bodySerializer?: BodySerializer<Body>;
	};

export default function createClient<Paths extends {}>(clientOptions: ClientOptions = {}) {
	const {
		querySerializer: globalQuerySerializer,
		bodySerializer: globalBodySerializer,
		...options
	} = clientOptions;
	let baseUrl = options.baseUrl ?? '';
	if (baseUrl.endsWith('/')) {
		baseUrl = baseUrl.slice(0, -1); // remove trailing slash
	}

	async function coreFetch<P extends keyof Paths, M extends HttpMethod>(
		url: P,
		fetchOptions: FetchOptions<M extends keyof Paths[P] ? Paths[P][M] : never>
	): Promise<FetchResponse<M extends keyof Paths[P] ? Paths[P][M] : unknown>> {
		const {
			method,
			headers,
			body: requestBody,
			params = {},
			querySerializer = globalQuerySerializer ?? defaultQuerySerializer,
			bodySerializer = globalBodySerializer ?? defaultBodySerializer,
			...init
		} = fetchOptions || {};

		// URL
		const finalURL = createFinalURL(url as string, {
			baseUrl,
			params,
			querySerializer
		});
		const finalHeaders = mergeHeaders(
			DEFAULT_HEADERS,
			clientOptions?.headers,
			headers,
			(params as any).header
		);

		// fetch!
		const requestInit: TauriFetchOptions = {
			method,
			body: undefined,
			...options,
			...init,
			headers: finalHeaders
		};
		if (requestBody) {
			requestInit.body = bodySerializer(requestBody as any);
		}
		// TODO: allow form data handling
		// see Body.form()

		const response = await fetch<any>(finalURL, requestInit);

		// handle empty content
		// note: we return `{}` because we want user truthy checks for `.data` or `.error` to succeed
		if (response.status === 204 || response.headers['Content-Length'] === '0') {
			return response.ok
				? { data: {} as any, response: response as any }
				: { error: {} as any, response: response as any };
		}

		// TODO: parse different types, non-records etc
		if (response.ok) {
			return { data: response.data, response: response as any };
		}

		return { error: response.data, response: response as any };
	}

	type MethodlessFetchOptions<T> = Omit<FetchOptions<T>, 'method'>;

	type GetPaths = PathsWithMethod<Paths, 'get'>;
	type PutPaths = PathsWithMethod<Paths, 'put'>;
	type PostPaths = PathsWithMethod<Paths, 'post'>;
	type DeletePaths = PathsWithMethod<Paths, 'delete'>;
	type OptionsPaths = PathsWithMethod<Paths, 'options'>;
	type HeadPaths = PathsWithMethod<Paths, 'head'>;
	type PatchPaths = PathsWithMethod<Paths, 'patch'>;
	type TracePaths = PathsWithMethod<Paths, 'trace'>;
	type GetFetchOptions<P extends GetPaths> = MethodlessFetchOptions<FilterKeys<Paths[P], 'get'>>;
	type PutFetchOptions<P extends PutPaths> = MethodlessFetchOptions<FilterKeys<Paths[P], 'put'>>;
	type PostFetchOptions<P extends PostPaths> = MethodlessFetchOptions<FilterKeys<Paths[P], 'post'>>;
	type DeleteFetchOptions<P extends DeletePaths> = MethodlessFetchOptions<
		FilterKeys<Paths[P], 'delete'>
	>;
	type OptionsFetchOptions<P extends OptionsPaths> = MethodlessFetchOptions<
		FilterKeys<Paths[P], 'options'>
	>;
	type HeadFetchOptions<P extends HeadPaths> = MethodlessFetchOptions<FilterKeys<Paths[P], 'head'>>;
	type PatchFetchOptions<P extends PatchPaths> = MethodlessFetchOptions<
		FilterKeys<Paths[P], 'patch'>
	>;
	type TraceFetchOptions<P extends TracePaths> = MethodlessFetchOptions<
		FilterKeys<Paths[P], 'trace'>
	>;

	return {
		/** Call a GET endpoint */
		async GET<P extends GetPaths>(
			url: P,
			...init: HasRequiredKeys<GetFetchOptions<P>> extends never
				? [GetFetchOptions<P>?]
				: [GetFetchOptions<P>]
		) {
			return coreFetch<P, 'get'>(url, { ...init[0], method: 'GET' } as any);
		},
		/** Call a PUT endpoint */
		async PUT<P extends PutPaths>(
			url: P,
			...init: HasRequiredKeys<PutFetchOptions<P>> extends never
				? [PutFetchOptions<P>?]
				: [PutFetchOptions<P>]
		) {
			return coreFetch<P, 'put'>(url, { ...init[0], method: 'PUT' } as any);
		},
		/** Call a POST endpoint */
		async POST<P extends PostPaths>(
			url: P,
			...init: HasRequiredKeys<PostFetchOptions<P>> extends never
				? [PostFetchOptions<P>?]
				: [PostFetchOptions<P>]
		) {
			return coreFetch<P, 'post'>(url, { ...init[0], method: 'POST' } as any);
		},
		/** Call a DELETE endpoint */
		async DELETE<P extends DeletePaths>(
			url: P,
			...init: HasRequiredKeys<DeleteFetchOptions<P>> extends never
				? [DeleteFetchOptions<P>?]
				: [DeleteFetchOptions<P>]
		) {
			return coreFetch<P, 'delete'>(url, {
				...init[0],
				method: 'DELETE'
			} as any);
		},
		/** Call a OPTIONS endpoint */
		async OPTIONS<P extends OptionsPaths>(
			url: P,
			...init: HasRequiredKeys<OptionsFetchOptions<P>> extends never
				? [OptionsFetchOptions<P>?]
				: [OptionsFetchOptions<P>]
		) {
			return coreFetch<P, 'options'>(url, {
				...init[0],
				method: 'OPTIONS'
			} as any);
		},
		/** Call a HEAD endpoint */
		async HEAD<P extends HeadPaths>(
			url: P,
			...init: HasRequiredKeys<HeadFetchOptions<P>> extends never
				? [HeadFetchOptions<P>?]
				: [HeadFetchOptions<P>]
		) {
			return coreFetch<P, 'head'>(url, { ...init[0], method: 'HEAD' } as any);
		},
		/** Call a PATCH endpoint */
		async PATCH<P extends PatchPaths>(
			url: P,
			...init: HasRequiredKeys<PatchFetchOptions<P>> extends never
				? [PatchFetchOptions<P>?]
				: [PatchFetchOptions<P>]
		) {
			return coreFetch<P, 'patch'>(url, { ...init[0], method: 'PATCH' } as any);
		},
		/** Call a TRACE endpoint */
		async TRACE<P extends TracePaths>(
			url: P,
			...init: HasRequiredKeys<TraceFetchOptions<P>> extends never
				? [TraceFetchOptions<P>?]
				: [TraceFetchOptions<P>]
		) {
			return coreFetch<P, 'trace'>(url, { ...init[0], method: 'TRACE' } as any);
		}
	};
}

// utils

/** serialize query params to string */
export function defaultQuerySerializer<T = unknown>(q: T): string {
	const search = new URLSearchParams();
	if (q && typeof q === 'object') {
		for (const [k, v] of Object.entries(q)) {
			if (v === undefined || v === null) {
				continue;
			}
			search.set(k, v);
		}
	}
	return search.toString();
}

/** serialize body object to string */
export function defaultBodySerializer<T>(body: T): Body {
	return Body.json(body as Record<any, any>);
}

/** Construct URL string from baseUrl and handle path and query params */
export function createFinalURL<O>(
	pathname: string,
	options: {
		baseUrl: string;
		params: { query?: Record<string, unknown>; path?: Record<string, unknown> };
		querySerializer: QuerySerializer<O>;
	}
): string {
	let finalURL = `${options.baseUrl}${pathname}`;
	if (options.params.path) {
		for (const [k, v] of Object.entries(options.params.path)) {
			finalURL = finalURL.replace(`{${k}}`, encodeURIComponent(String(v)));
		}
	}
	const search = options.querySerializer((options.params.query as any) ?? {});
	if (search) {
		finalURL += `?${search}`;
	}
	return finalURL;
}

/** merge headers a and b, with b taking priority */
export function mergeHeaders(...allHeaders: (HeadersOptions | undefined)[]): HeadersOptions {
	const headers: Record<string, string> = {};
	for (const headerSet of allHeaders) {
		if (!headerSet || typeof headerSet !== 'object') {
			continue;
		}

		for (const [k, v] of Object.entries(headerSet)) {
			if (v === null) {
				delete headers[k];
			} else if (v !== undefined) {
				headers[k] = v.toString();
			}
		}
	}
	return headers;
}
