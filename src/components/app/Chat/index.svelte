<script>
	import UserSidebar from '../UserSidebar.svelte';
	import ChatContainer from './ChatContainer.svelte';
	import { onMount } from 'svelte';
	import SocketController from '../../../config/socket/index';

	onMount(() => {
		new SocketController();
	});

</script>


<aside class='w-96'>
	<UserSidebar />
</aside>
<div class='w-full flex-grow flex flex-col'>
	<ChatContainer />
</div>
