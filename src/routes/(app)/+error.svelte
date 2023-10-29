<script lang="ts">
	import { page } from '$app/stores';
	import { ArrowLeft } from 'lucide-svelte';
</script>

<div class="mt-10 text-center">
	<h1 class="text-8xl font-bold">Error {$page.status}</h1>
	<p class="text-xl">
		{$page.error?.message || 'How did we get here?'}
	</p>
	<button class="btn mt-4" on:click={() => history.back()}>
		<ArrowLeft />
		Go back
	</button>
</div>
