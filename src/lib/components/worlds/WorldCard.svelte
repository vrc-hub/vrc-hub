<script lang="ts">
	import type { LimitedWord, World } from '$lib/api/vrchat';

	export let world: LimitedWord | World;
</script>

<div class="card w-64 bg-base-100 shadow-xl">
	<figure>
		<img src={world.imageUrl} alt={world.name} />
	</figure>
	<div class="card-body">
		<div class="card-title">
			{world.name}
		</div>
	</div>
</div>
