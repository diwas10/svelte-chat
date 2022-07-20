<script>
	import UserSidebar from '../components/app/UserSidebar.svelte';
	import ChatContainer from '../components/app/Chat/ChatContainer.svelte';
	import UserLoginModal from '../components/app/utils/UserLoginModal.svelte';
</script>
<aside class='w-96'>
	<UserSidebar />
</aside>
<div class='w-full flex-grow flex flex-col'>
	<ChatContainer />
</div>

<UserLoginModal />
