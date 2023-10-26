<script lang="ts">
	import { page } from '$app/stores';
	import { friends } from '$lib/stores/friends';

	$: friend = $friends.find((f) => f.id === $page.params.id);
</script>

{#if friend}
	{friend.displayName}
{/if}
