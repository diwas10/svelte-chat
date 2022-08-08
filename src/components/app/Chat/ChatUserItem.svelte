<script lang='ts'>
	import Text from '../../core/Text/Text.svelte';
	import UserIcon from '../../core/utils/UserIcon.svelte';

	export let name: string;
	export let lastMsg: string;
</script>
<div class='px-5 py-4 rounded-lg dark:bg-dark-1 bg-gray-100 mb-2 cursor-pointer flex items-center'>
	<UserIcon name='{name}' />
	<div>
		<Text variant='h6' typeface='semibold' className='ml-3'>
			{name}
		</Text>
		<Text variant='small' lightFont='text-gray-500' darkFontClass='text-gray-500' typeface='semibold' className='ml-3'>
			{lastMsg}
		</Text>
	</div>
</div>
