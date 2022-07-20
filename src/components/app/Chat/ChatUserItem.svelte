<script lang='ts'>
	import Text from '../../core/Text/Text.svelte';
</script>
<div class='px-5 py-4 rounded-2xl dark:bg-dark-1 bg-gray-100 mb-2 cursor-pointer'>
	<Text variant='h6' typeface='semibold'>
		<slot></slot>
	</Text>
</div>
