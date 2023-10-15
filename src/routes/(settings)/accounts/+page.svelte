<script lang="ts">
	import Avatar from '$lib/components/content/Avatar.svelte';
	import { accounts } from '$lib/stores/accounts';
	import { ArrowRight, PlusCircle, User2, X } from 'lucide-svelte';
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
		{#each $accounts as { identifier, thumbnail }}
			<div class="card w-full max-w-sm shadow-2xl bg-base-100">
				<div class="card-body">
					<div class="flex gap-4 items-center">
						<Avatar src={thumbnail} fallback={identifier} />
						<span class="flex-1 text-xl">{identifier}</span>
						<span><X /></span>
						<span><ArrowRight /></span>
					</div>
				</div>
			</div>
		{/each}

		<a class="cursor-pointer" href="/accounts/add">
			<PlusCircle />
		</a>
	</div>
</div>
