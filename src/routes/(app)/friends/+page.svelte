<script lang="ts">
	import UserCard from '$lib/components/users/UserCard.svelte';
	import { nameSort } from '$lib/components/utils/users';
	import { activeAccount } from '$lib/stores/accounts';
	import { friends, refreshFriends } from '$lib/stores/friends';
	import { ChevronsDownUp, ChevronsUpDown, RefreshCw } from 'lucide-svelte';
	import { derived } from 'svelte/store';
	import { slide } from 'svelte/transition';

	let collapseOnline = false;
	let collapseOffline = true;

	const onlineFriends = derived(friends, ($friends) =>
		$friends.filter((f) => f.status !== 'offline').sort(nameSort)
	);

	const offlineFriends = derived(friends, ($friends) =>
		$friends.filter((f) => f.status == 'offline').sort(nameSort)
	);
</script>

<div class="flex items-center p-4">
	<div>
		<button class="btn btn-ghost btn-circle" on:click={() => (collapseOnline = !collapseOnline)}>
			{#if collapseOnline}
				<ChevronsUpDown />
			{:else}
				<ChevronsDownUp />
			{/if}
		</button>
	</div>
	<h1 class="text-2xl font-semibold mx-auto">Online ({$onlineFriends.length})</h1>
	<div>
		<button class="btn btn-ghost btn-circle" on:click={() => refreshFriends($activeAccount)}>
			<RefreshCw />
		</button>
	</div>
</div>
{#if !collapseOnline}
	<div class="flex flex-wrap justify-center gap-4" transition:slide>
		{#each $onlineFriends as user}
			<UserCard {user} />
		{/each}
	</div>
{/if}

<div class="flex items-center p-4">
	<div>
		<button class="btn btn-ghost btn-circle" on:click={() => (collapseOffline = !collapseOffline)}>
			{#if collapseOffline}
				<ChevronsUpDown />
			{:else}
				<ChevronsDownUp />
			{/if}
		</button>
	</div>
	<h1 class="text-2xl font-semibold mx-auto">Offline ({$offlineFriends.length})</h1>
	<div>
		<button class="btn btn-ghost btn-circle" on:click={() => refreshFriends($activeAccount)}>
			<RefreshCw />
		</button>
	</div>
</div>
{#if !collapseOffline}
	<div class="flex flex-wrap justify-center gap-4" transition:slide>
		{#each $offlineFriends as user}
			<UserCard {user} />
		{/each}
	</div>
{/if}
