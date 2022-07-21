<script>
	import UserSidebar from '../components/app/UserSidebar.svelte';
	import ChatContainer from '../components/app/Chat/ChatContainer.svelte';
	import UserLoginModal from '../components/app/utils/UserLoginModal.svelte';
	import { isAuthenticated } from '../store/auth.store';
</script>

{#if $isAuthenticated}
	<aside class='w-96'>
		<UserSidebar />
	</aside>
	<div class='w-full flex-grow flex flex-col'>
		<ChatContainer />
	</div>
{/if}

<UserLoginModal />
