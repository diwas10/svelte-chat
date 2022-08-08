<script>
	import UserSidebar from '../UserSidebar.svelte';
	import ChatContainer from './ChatContainer.svelte';
	import socket from '../../../config/socket/index.ts';

</script>


<aside class='w-96'>
	<UserSidebar />
</aside>
<div class='w-full flex-grow flex flex-col'>
	<ChatContainer />
</div>
