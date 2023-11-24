<script lang="ts">
	import type { CurrentUser, LimitedUser } from '$lib/api/vrchat';
	import { getTrustRank, hasVRCPlus, isContributor, isModerator } from '$lib/utils/users';
	import { Braces, Gavel, MessageSquarePlus, Shield } from 'lucide-svelte';

	export let user: LimitedUser | CurrentUser;

	export let showTrustRank = true;
	export let showVRCPlus = true;
	export let showMeta = true;

	$: rank = getTrustRank(user);
	$: vrcplus = hasVRCPlus(user);
	$: moderator = isModerator(user);
	$: contributor = isContributor(user);
</script>

{#if showTrustRank}
	{#if rank === 'Trusted User'}
		<div class="badge bg-[#8143e6] text-neutral-100 p-3">
			<Shield class="pr-2" />
			Veteran
		</div>
	{:else if rank === 'Known User'}
		<div class="badge bg-[#ff7b42] text-neutral-100 p-3">
			<Shield class="pr-2" />
			Known User
		</div>
	{:else if rank === 'User'}
		<div class="badge bg-[#2bcf5c] text-neutral-900 p-3">
			<Shield class="pr-2" />
			User
		</div>
	{:else if rank === 'New User'}
		<div class="badge bg-[#1778ff] text-neutral-100 p-3">
			<Shield class="pr-2" />
			New user
		</div>{:else if rank === 'Visitor'}
		<div class="badge bg-[#cccccc] text-neutral-900 p-3">
			<Shield class="pr-2" />
			Visitor
		</div>
	{:else if rank === 'Troll'}
		<div class="badge bg-[#cccccc] text-neutral-900 p-3">
			<Shield class="pr-2" />
			Troll
		</div>{/if}
{/if}

{#if showVRCPlus}
	{#if vrcplus}
		<div class="badge bg-[#ffff00] text-neutral-900 p-3">
			<MessageSquarePlus class="pr-2" />
			VRC+
		</div>
	{/if}
{/if}

{#if showMeta}
	{#if moderator}
		<div class="badge bg-[#ff2233] text-neutral-100 p-3">
			<Gavel class="pr-2" />
			Moderator
		</div>
	{/if}
	{#if contributor}
		<div class="badge bg-[#ff2233] text-neutral-100 p-3">
			<Braces class="pr-2" />
			Contributor
		</div>
	{/if}
{/if}
