<script lang='ts'>
	import { toastStyle, showToast, toastMessage } from './index.js';
	import { afterUpdate } from 'svelte';
	import { fly } from 'svelte/transition';

	const switchIconsClass = () => {
		switch ($toastStyle) {
			case 'success':
				return 'bi-check-circle-fill';

			default :
				return 'bi-exclamation-circle-fill';
		}
	};

	const closeToast = () => {
		showToast.update(() => false);
		toastMessage.update(() => '');
		toastStyle.update(() => undefined);
	};

	afterUpdate(() => {
		setTimeout(() => {
			closeToast();
		}, 5000);
	});
</script>

<div class='toast-container'>
	{#if $showToast}
		<div transition:fly={{y:-100, opacity:0.5 }} class='toast {$toastStyle}'>
			<div class='flex'>
				<i class='mr-2 bi {switchIconsClass()}'></i>
				<p>{$toastMessage}</p>
			</div>
			<button on:click={closeToast} class='bi bi-x bg-transparent border-0 text-2xl p-2'></button>
		</div>
	{/if}
</div>

