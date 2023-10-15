<script lang="ts">
	import { Globe, Menu, Search, Users2 } from 'lucide-svelte';
	import Avatar from '../content/Avatar.svelte';
</script>

<div class="p-4">
	<div class="navbar bg-base-100 rounded-xl shadow-2xl">
		<div class="navbar-start">
			<button class="btn btn-ghost btn-circle">
				<!-- TODO: Get avatar from user cache -->
				<Avatar src="https://avatars.githubusercontent.com/u/17461028" fallback="bddvlpr" />
			</button>
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
