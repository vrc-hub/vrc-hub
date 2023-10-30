<script lang="ts">
	import type { CurrentUser, LimitedUser } from '$lib/api/vrchat';
	import { getStatus } from '../utils/users';
	import UserIcon from './UserIcon.svelte';
	import UserTags from './UserTags.svelte';

	export let user: LimitedUser | CurrentUser;
</script>

<a class="card bg-base-200 shadow-xl w-96 hover:outline" href={`/users/${user.id}`}>
	<div class="card-body">
		<div class="flex gap-4 items-center">
			<div class="align-middle"><UserIcon {user} /></div>
			<div class="flex flex-col">
				<span class="text-lg line-clamp-1">{user.displayName}</span>
				<span class="line-clamp-1">
					{getStatus(user)}
				</span>
				<span>
					<UserTags {user} showTrustRank={false} />
				</span>
			</div>
		</div>
	</div>
</a>
