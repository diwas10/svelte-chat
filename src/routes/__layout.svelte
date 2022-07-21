<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import Spinner from '../components/core/utils/Spinner.svelte';

	let ready = false;

	const darkModeToggle = () => {
		// On page load or when changing themes, best to add inline in `head` to avoid FOUC
		if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};

	onMount(() => {
		darkModeToggle();
		ready = true;
	});
</script>
<div id='wrapper' class='dark:bg-dark-2 flex flex-col'>
	<div class='app-height app-wrapper-layout'>
		{#if ready}
			<slot />
		{:else}
			<div class='h-full grid place-content-center w-full'>
				<Spinner className='h-10 w-10' />
			</div>
		{/if}
	</div>
</div>
