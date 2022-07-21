<script lang='ts'>
	import Text from '../../core/Text/Text.svelte';

	export let float: 'ml-auto' | 'mr-auto' = 'ml-auto';
	const classNames = `px-4 py-2 mb-4 rounded-lg w-fit max-w-4/5 ${float} ${float === 'ml-auto' ? 'bg-primary' : 'dark:bg-dark-2 bg-white'}`;
</script>
<li class='{classNames}'>
	<Text lightFont='{float==="ml-auto"? "text-dark-w":""}'>
		<slot></slot>
	</Text>
</li>
