<script lang="ts">
	import { accounts, type Account, activeAccount } from '$lib/stores/accounts';
	import { ArrowRight, X } from 'lucide-svelte';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { useClient } from '$lib/api/vrchat';
	import Spinner from '../content/Spinner.svelte';
	import Avatar from '../content/Avatar.svelte';

	export let account: Account;

	const deleteAccount = () => {
		accounts.set(get(accounts).filter((a) => a !== account));
	};

	const activateAccount = () => {
		activeAccount.set(account);
		goto('/');
	};
</script>

<div class="card w-full max-w-sm shadow-2xl bg-base-100">
	<div class="card-body">
		<div class="flex gap-4 items-center">
			{#await useClient().GET('/auth/user', { headers: { Cookie: `auth=${account.accessToken}` } })}
				<Spinner />
			{:then { data }}
				<Avatar
					src={data?.profilePicOverride || data?.userIcon || data?.currentAvatarThumbnailImageUrl}
					fallback={account.identifier}
				/>
			{/await}
			<span class="flex-1 text-xl">{account.identifier}</span>
			<button on:click={deleteAccount}><X /></button>
			<button on:click={activateAccount}><ArrowRight /></button>
		</div>
	</div>
</div>
