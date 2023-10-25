<script lang="ts">
	export let tooltip: string;
	export let href: string | undefined = undefined;
</script>

{#if href}
	<div class="tooltip tooltip-bottom" data-tip={tooltip}>
		<a class="btn btn-ghost btn-circle" {href}>
			<slot />
		</a>
	</div>
{:else}
	<div class="tooltip tooltip-bottom" data-tip={tooltip}>
		<button class="btn btn-ghost btn-circle" on:click>
			<slot />
		</button>
	</div>
{/if}
