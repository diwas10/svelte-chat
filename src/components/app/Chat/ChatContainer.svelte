<script>
	import ChatHeader from './ChatHeader.svelte';
	import ChatBody from './ChatBody.svelte';
</script>

<ChatHeader />
<main class='app-flex-layout app-main-layout relative'>
	<div class='flex-grow'>
		<ChatBody />
	</div>
</main>
