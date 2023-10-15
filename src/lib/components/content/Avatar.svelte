<script lang="ts">
	export let src: string;
	export let fallback = '?';

	export let size = 'w-10';
	export let rounded = 'rounded-full';

	let failed = false;

	$: initials = fallback.slice(0, 1);
</script>

{#if !failed}
	<div class="avatar">
		<div class="{size} {rounded}">
			<img {src} alt={`${fallback}'s avatar`} on:error={() => (failed = true)} />
		</div>
	</div>
{:else}
	<div class="avatar placeholder">
		<div class="{size} {rounded} text-neutral-content bg-neutral-focus">
			<span class="text-xl">
				{initials}
			</span>
		</div>
	</div>
{/if}
