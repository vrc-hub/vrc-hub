import sequence from 'svelte-sequential-preprocessor';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config}*/
const config = {
	preprocess: sequence([vitePreprocess()]),
	kit: {
		adapter: adapter({ fallback: 'index.html' })
	}
};
export default config;
