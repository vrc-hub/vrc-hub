<script lang="ts">
	import UserIcon from '$lib/components/users/UserIcon.svelte';
	import UserTags from '$lib/components/users/UserTags.svelte';
	import { getDaysSince } from '$lib/components/utils/date';
	import { getStatus } from '$lib/components/utils/users';
	import WorldCard from '$lib/components/worlds/WorldCard.svelte';
	import { Calendar, Languages, MonitorSmartphone } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { formatDate, formatNumber } from '$lib/components/utils/text';

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
			<div class="ml-auto">Buttons here</div>
		</div>
		<div class="stats stats-vertical lg:stats-horizontal shadow my-4">
			<div class="stat">
				<div class="stat-figure text-primary">
					<Calendar />
				</div>
				<div class="stat-title">Days registered</div>
				<div class="stat-value">{formatNumber(getDaysSince(joinedDate))}</div>
				<div class="stat-desc">Since {formatDate(new Date(data.user.date_joined))}</div>
			</div>
			<div class="stat">
				<div class="stat-figure text-primary">
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
				<div class="stat-figure text-primary">
					<Languages />
				</div>
				<div class="stat-title">Languages</div>
				<div class="stat-value">TODO</div>
				<div class="stat-desc">(Todo)</div>
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
