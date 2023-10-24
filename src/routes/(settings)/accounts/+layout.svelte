<script lang="ts">
	import { resetActiveAccount } from '$lib/stores/accounts';
	import { onMount } from 'svelte';

	onMount(() => resetActiveAccount());
</script>

<slot />
