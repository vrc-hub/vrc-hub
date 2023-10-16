<script lang="ts">
	import AccountCard from '$lib/components/accounts/AccountCard.svelte';
	import { accounts } from '$lib/stores/accounts';
	import { PlusCircle, User2 } from 'lucide-svelte';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col gap-8">
		<div class="text-center" in:fly={{ y: 150, duration: 600, easing: quintOut }}>
			<h1 class="text-5xl font-bold">
				<User2 class="inline-block" size="48" />
				<span class="align-middle"> Accounts </span>
			</h1>
		</div>
		{#each $accounts as account}
			<AccountCard {account} />
		{/each}
		<a class="link" href="/accounts/add">
			<PlusCircle />
		</a>
	</div>
</div>
