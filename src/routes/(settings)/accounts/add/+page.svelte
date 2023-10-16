<script lang="ts">
	import { goto } from '$app/navigation';
	import { getUserData, logIn, twoFactor, type TwoFactorType } from '$lib/api/vrchat/impl/auth';
	import { accounts } from '$lib/stores/accounts';
	import { showToast } from '$lib/stores/toasts';
	import { ArrowLeft, Rocket } from 'lucide-svelte';
	import { quintOut } from 'svelte/easing';
	import { get } from 'svelte/store';
	import { fly } from 'svelte/transition';

	let username = '';
	let password = '';
	let auth = '';

	let twoFactorModal: HTMLDialogElement;
	let twoFactorCode = '';
	let twoFactorTypes: TwoFactorType[] = [];

	const submitLogIn = async () => {
		const response = await logIn(username, password);

		if (response.result === 'error') {
			// TODO: Toast
			showToast(`Failed to log in: ${response.message}.`, 'alert-error');
			return;
		}

		auth = response.auth;

		if (response.result === 'twofactor') {
			twoFactorTypes = response.types;
			twoFactorModal.show();
		} else finalizeLogIn();
	};

	const submitTwoFactor = async () => {
		const type = twoFactorTypes.includes('emailotp') ? 'emailotp' : 'totp';
		const response = await twoFactor(twoFactorCode, type, auth);

		if (response.ok) finalizeLogIn();
		else showToast('Invalid two factor authentication code.', 'alert-error');
	};

	const finalizeLogIn = async () => {
		const { data, error } = await getUserData(auth);
		if (error) showToast("Couldn't fetch user data.");
		else {
			accounts.set([
				...get(accounts),
				{
					identifier: data.displayName,
					accessToken: auth
				}
			]);
			goto('/accounts');
		}
	};
</script>

<dialog class="modal" bind:this={twoFactorModal}>
	<div class="modal-box">
		<h3 class="font-bold text-lg">2FA Verification</h3>
		<p class="py-4">
			Complete one of the following two-factor authentication methods below in order to log in. If
			you do not have a 2FA app, an e-mail should be sent to your mailbox.
		</p>

		<form on:submit|preventDefault={submitTwoFactor}>
			<input class="input input-bordered w-full" placeholder="Code" bind:value={twoFactorCode} />
			<div class="modal-action">
				<input class="btn" type="submit" value="Submit" />
			</div>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>Close</button>
	</form>
</dialog>

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
				<span class="link">Back to accounts</span>
			</a>
		</div>
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<form class="card-body" on:submit|preventDefault={submitLogIn}>
				<div class="form-control">
					<label class="label" for="username">
						<span class="label-text">Username</span>
					</label>
					<input
						class="input input-bordered"
						id="username"
						type="text"
						placeholder="username"
						required
						bind:value={username}
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
						bind:value={password}
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
