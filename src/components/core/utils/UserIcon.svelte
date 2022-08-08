<script lang='ts'>
	import { onMount } from 'svelte';

	export let name: string;
	let text = '';

	onMount(() => {
		if (name) {
			const nameArray = name.split(' ');
			text = `${nameArray[0].charAt(0)}${nameArray[nameArray.length - 1].charAt(0)}`.toUpperCase();
		}
	});

</script>

<div class='bg-primary h-8 w-8 p-1 rounded-full flex justify-center items-center'>
	<p class='text-white text-sm'>{text}</p>
</div>
