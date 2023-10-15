<script lang="ts">
	import { ArrowLeft, Rocket } from 'lucide-svelte';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col xl:flex-row gap-8">
		<div class="text-center xl:text-left" in:fly={{ y: 150, duration: 600, easing: quintOut }}>
			<h1 class="text-5xl font-bold">
				<Rocket class="inline-block" size="42" />
				<span class="align-middle">Add account</span>
			</h1>
			<div />
			<p class="py-6 max-w-prose">
				These credentials are used once to retrieve an access token and will not be shared, sent or
				saved to any third party. If this token expires, you'll be asked to log in again.
			</p>
			<a href="/accounts">
				<ArrowLeft class="inline-block" />
				<span class="underline">Back to accounts</span>
			</a>
		</div>
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<form class="card-body">
				<div class="form-control">
					<label class="label" for="email">
						<span class="label-text">Email</span>
					</label>
					<input
						class="input input-bordered"
						id="email"
						type="email"
						placeholder="email"
						required
					/>
				</div>
				<div class="form-control">
					<label class="label" for="password">
						<span class="label-text">Password</span>
					</label>
					<input
						class="input input-bordered"
						id="password"
						type="password"
						placeholder="password"
						required
					/>
					<span class="label">
						<a
							class="label-text-alt link link-hover"
							href="https://vrchat.com/home/password"
							target="_blank"
						>
							Forgot password?
						</a>
					</span>
				</div>
				<div class="form-control mt-6">
					<button class="btn btn-primary">Login</button>
				</div>
			</form>
		</div>
	</div>
</div>
