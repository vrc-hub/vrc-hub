import { get, writable } from 'svelte/store';

export type ToastType = 'alert-info' | 'alert-error' | 'alert-success';

export type Toast = {
	message: string;
	type?: ToastType;
};

export const toasts = writable<Toast[]>([]);

export const showToast = (message: string, type: ToastType = "alert-info", duration = 5000) => {
  const toast = {message, type};
	toasts.set([...get(toasts), toast]);
		setTimeout(() => toasts.set(get(toasts).filter((t) => t !== toast)), duration);
};
