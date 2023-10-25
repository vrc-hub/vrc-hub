<script lang="ts">
	import { friends } from '$lib/stores/friends';
	import { derived } from 'svelte/store';

	const onlineFriends = derived(friends, ($friends) =>
		$friends.filter((f) => f.status !== 'offline').sort()
	);

	const offlineFriends = derived(friends, ($friends) =>
		$friends.filter((f) => f.status == 'offline').sort()
	);
</script>

Loaded {$friends.length} friends. Currently {$onlineFriends.length} friends online.
<h1 class="text-2xl font-semibold">Online ({$onlineFriends.length})</h1>
{#each $onlineFriends as friend}
	{friend.displayName}
{/each}
<h1 class="text-2xl font-semibold">Offline ({$offlineFriends.length})</h1>
{#each $offlineFriends as friend}
	{friend.displayName}
{/each}
