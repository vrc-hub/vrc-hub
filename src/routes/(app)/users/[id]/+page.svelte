<script lang="ts">
	import UserIcon from '$lib/components/users/UserIcon.svelte';
	import UserTags from '$lib/components/users/UserTags.svelte';
	import { getStatus } from '$lib/components/utils/users';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="card bg-base-200 shadow-xl">
	<div class="card-body">
		<div class="flex items-center gap-4">
			<div>
				<UserIcon user={data.friend} size="w-32" />
			</div>
			<div>
				<h1 class="text-4xl font-bold">
					{data.friend.displayName}
				</h1>
				<p class="text-xl">{getStatus(data.friend)}</p>
				<UserTags user={data.friend} />
			</div>
		</div>
	</div>
</div>
