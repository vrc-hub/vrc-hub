<script lang="ts">
	import { Globe, Menu, Search, Users2 } from 'lucide-svelte';
	import Avatar from '../content/Avatar.svelte';
	import { getSelfData, getSelfPicture } from '$lib/api/vrchat/impl/self';
	import { activeAccount } from '$lib/stores/accounts';
	import Spinner from '../content/Spinner.svelte';
</script>

<div class="p-4">
	<div class="navbar bg-base-100 rounded-xl shadow-2xl">
		<div class="navbar-start">
			<div class="dropdown">
				<button class="btn btn-ghost btn-circle" tabindex="0">
					{#await getSelfData()}
						<Spinner />
					{:then { data }}
						<Avatar
							src={data ? getSelfPicture(data) : undefined}
							fallback={data?.displayName ?? $activeAccount?.identifier}
						/>
					{/await}
				</button>
				<ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-48">
					<li><a href="/accounts">Accounts</a></li>
					<li><a href="/">Settings</a></li>
				</ul>
			</div>
		</div>
		<div class="navbar-center">
			<div class="tooltip tooltip-bottom" data-tip="Search">
				<button class="btn btn-ghost btn-circle">
					<Search />
				</button>
			</div>
			<div class="tooltip tooltip-bottom" data-tip="Worlds">
				<button class="btn btn-ghost btn-circle">
					<Globe />
				</button>
			</div>

			<div class="tooltip tooltip-bottom" data-tip="Friends">
				<button class="btn btn-ghost btn-circle">
					<Users2 />
				</button>
			</div>
		</div>
		<div class="navbar-end">
			<button class="btn btn-ghost btn-circle">
				<Menu />
			</button>
		</div>
	</div>
</div>
