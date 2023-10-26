<script lang="ts">
	import type { CurrentUser, LimitedUser } from '$lib/api/vrchat';
	import { getIcon, getThumbnail } from '../utils/users';

	export let user: LimitedUser | CurrentUser;
	let failed = false;

	const getStatus = () => {
		switch (user.status) {
			case 'active':
				return 'status-online';
			case 'join me':
				return 'status-joinme';
			case 'ask me':
				return 'status-askme';
			case 'busy':
				return 'status-busy';
			case 'offline':
			default:
				return 'status-offline';
		}
	};

	$: status = getStatus();
</script>

{#if !failed}
	<div class="avatar {status}">
		<div class="w-16 rounded-full">
			<img
				src={getThumbnail(getIcon(user))}
				alt={`${user.displayName}'s avatar`}
				on:error={() => (failed = true)}
			/>
		</div>
	</div>
{:else}
	<div class="avatar {status} placeholder">
		<div class="w-16 rounded-full text-neutral-content bg-neutral-focus">
			<span class="text-2xl"> ? </span>
		</div>
	</div>
{/if}

<style lang="postcss">
	.avatar {
		&.status-online {
			&:before {
				content: '';
				@apply bg-success outline-base-100 absolute z-10 block rounded-full outline outline-4;
				width: 18%;
				height: 18%;
				top: 7%;
				right: 7%;
			}
		}

		&.status-joinme {
			&:before {
				content: '';
				@apply bg-cyan-400 outline-base-100 absolute z-10 block rounded-full outline outline-4;
				width: 18%;
				height: 18%;
				top: 7%;
				right: 7%;
			}
		}

		&.status-askme {
			&:before {
				content: '';
				@apply bg-orange-400 outline-base-100 absolute z-10 block rounded-full outline outline-4;
				width: 18%;
				height: 18%;
				top: 7%;
				right: 7%;
			}
		}

		&.status-busy {
			&:before {
				content: '';
				@apply bg-red-400 outline-base-100 absolute z-10 block rounded-full outline outline-4;
				width: 18%;
				height: 18%;
				top: 7%;
				right: 7%;
			}
		}

		&.status-offline {
			&:before {
				content: '';
				@apply bg-neutral outline-base-100 absolute z-10 block rounded-full outline outline-4;
				width: 18%;
				height: 18%;
				top: 7%;
				right: 7%;
			}
		}
	}
</style>
