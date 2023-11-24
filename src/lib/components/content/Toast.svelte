<script lang="ts">
	import { toasts } from '$lib/stores/toasts';
</script>

<div class="toast toast-end z-[1]">
	{#each $toasts as { type, message }}
		<div class="alert {type ?? 'type-info'}">
			<span>{message}</span>
		</div>
	{/each}
</div>
