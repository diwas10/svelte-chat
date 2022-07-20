<script lang='ts'>
	import classNames from 'classnames';
	import Spinner from '../utils/Spinner.svelte';

	export let className = '';
	export let type: 'submit' | 'button' | 'reset' = 'submit';
	export let loading = false;
	export let variant: 'primary' | 'gray' = 'primary';

	const classes = classNames({ [`btn-${variant}`]: true, [`${className}`]: className });


</script>

<button type='{type}' class='{classes}'>
	{#if loading}
		<Spinner />
	{:else}
		<slot />
	{/if}
</button>
<!--<button type='button'-->
<!--				class='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'>-->
<!--	Cancel-->
<!--</button>-->
