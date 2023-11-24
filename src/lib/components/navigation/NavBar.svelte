<script lang="ts">
	import { Globe, Home, Users2 } from 'lucide-svelte';
	import Avatar from '../content/Avatar.svelte';
	import { getSelfData, getSelfPicture } from '$lib/api/vrchat/impl/self';
	import { activeAccount } from '$lib/stores/accounts';
	import Spinner from '../content/Spinner.svelte';
	import NavBarIcon from './NavBarIcon.svelte';
</script>

<div class="p-4">
	<div class="navbar bg-base-100 rounded-xl shadow-2xl">
		<div class="navbar-start">
			{#await getSelfData()}
				<Spinner />
			{:then { data }}
				<div class="dropdown">
					<button class="btn btn-ghost btn-circle" tabindex="0">
						<Avatar
							src={data ? getSelfPicture(data) : undefined}
							fallback={data?.displayName ?? $activeAccount?.identifier}
						/>
					</button>
					<ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-48">
						<li><a href="/users/{data.id}">Profile</a></li>
						<li><a href="/accounts">Accounts</a></li>
						<li><a href="/">Settings</a></li>
					</ul>
				</div>
			{/await}
		</div>
		<div class="navbar-center">
			<NavBarIcon tooltip="Home" href="/">
				<Home />
			</NavBarIcon>
			<NavBarIcon tooltip="Worlds" href="/worlds">
				<Globe />
			</NavBarIcon>
			<NavBarIcon tooltip="Friends" href="/friends">
				<Users2 />
			</NavBarIcon>
		</div>
		<div class="navbar-end" />
	</div>
</div>
