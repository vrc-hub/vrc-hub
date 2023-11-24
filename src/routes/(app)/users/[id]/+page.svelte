<script lang="ts">
	import UserIcon from '$lib/components/users/UserIcon.svelte';
	import UserTags from '$lib/components/users/UserTags.svelte';
	import WorldCard from '$lib/components/worlds/WorldCard.svelte';
	import { Calendar, Languages, Minus, MonitorSmartphone, Plus, X } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { getStatus } from '$lib/utils/users';
	import { formatDate, formatNumber } from '$lib/utils/text';
	import { getDaysSince } from '$lib/utils/date';

	export let data: PageData;

	$: joinedDate = new Date(data.user.date_joined);
	$: platform = data.user.last_platform;
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
			<div class="ml-auto">
				{#if data.user.isFriend}
					<div class="tooltip tooltip-bottom" data-tip="Remove friend">
						<button class="btn btn-outline btn-circle" on:click>
							<Minus />
						</button>
					</div>
				{:else}
					<div class="tooltip tooltip-bottom" data-tip="Add friend">
						<button class="btn btn-outline btn-circle" on:click>
							<Plus />
						</button>
					</div>
				{/if}
				<div class="tooltip tooltip-bottom" data-tip="Block">
					<button class="btn btn-outline btn-circle" on:click>
						<X />
					</button>
				</div>
			</div>
		</div>
		<div class="stats stats-vertical lg:stats-horizontal shadow my-4">
			<div class="stat">
				<div class="stat-figure">
					<Calendar />
				</div>
				<div class="stat-title">Days registered</div>
				<div class="stat-value">{formatNumber(getDaysSince(joinedDate))}</div>
				<div class="stat-desc">Since {formatDate(new Date(data.user.date_joined))}</div>
			</div>
			<div class="stat">
				<div class="stat-figure">
					<MonitorSmartphone />
				</div>
				<div class="stat-title">Platform</div>
				<div class="stat-value">
					{#if platform === 'standalonewindows'}
						Windows
					{:else}
						Quest
					{/if}
				</div>
				<div class="stat-desc">Since request</div>
			</div>
			<div class="stat">
				<div class="stat-figure">
					<Languages />
				</div>
				<div class="stat-title">Languages</div>
				<div class="stat-value">TODO</div>
				<div class="stat-desc">(Todo)</div>
			</div>
		</div>
		{#if data.user.bio}
			<h2 class="text-2xl font-semibold pt-4 pl-2">Bio</h2>
			<hr class="p-2" />
			{data.user.bio}
		{/if}
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
