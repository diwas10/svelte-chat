<script lang='ts'>
	import { isAuthenticated } from '../store/auth.store';
	import Chat from '../components/app/Chat/index.svelte';
	import UserLoginModal from '$components/app/utils/UserLoginModal.svelte';
</script>

{#if $isAuthenticated}
	<Chat />
{/if}

<UserLoginModal />
