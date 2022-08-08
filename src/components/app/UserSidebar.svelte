<script lang='ts'>
	import ChatUserItem from './Chat/ChatUserItem.svelte';
	import { Input, Text } from '../core';
	import UserIcon from '../core/utils/UserIcon.svelte';

	// Socket.on('');

	let Users = ['Santosh', 'Sujan', 'Dinesh'];
	let search = '';
</script>

<div class='h-full py-3'>
	<div class='py-1 px-3	 border-r dark:border-gray-700'>
		<Input
			name='search'
			placeholder='Search Users' value={search}
			on:keypress={(e)=>{if(e.key==="Enter"){console.log(search)}}} className=''
		/>
	</div>
	<div class='px-3	 py-3'>
		<Text className='pb-4 pt-3' variant='h5'>All Message</Text>
		{#each Users as user, index (user)}
			<ChatUserItem lastMsg='Hello' name='{user}' />
		{/each}
	</div>
</div>
