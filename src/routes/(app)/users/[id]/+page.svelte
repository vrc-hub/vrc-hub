<script lang="ts">
	import UserIcon from '$lib/components/users/UserIcon.svelte';
	import UserTags from '$lib/components/users/UserTags.svelte';
	import { getStatus } from '$lib/components/utils/users';
	import WorldCard from '$lib/components/worlds/WorldCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="card bg-base-200 shadow-xl">
	<div class="card-body">
		<div class="flex items-center gap-4">
			<div>
				<UserIcon user={data.user} size="w-32" />
			</div>
			<div>
				<h1 class="text-4xl font-bold">
					{data.user.displayName}
				</h1>
				<UserTags user={data.user} />
				<p class="text-xl">{getStatus(data.user)}</p>
			</div>
		</div>
		{#if data.worlds.length}
			<h2 class="text-2xl font-semibold pt-4 pl-2">Worlds</h2>
			<hr class="p-2" />
			<div class="flex flex-nowrap gap-4 overflow-auto">
				{#each data.worlds as world}
					<div class="p-4">
						<WorldCard {world} />
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
