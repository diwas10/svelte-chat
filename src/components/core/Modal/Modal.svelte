<script>
	export let className = '';
	export let isOpen = false;
</script>
{#if isOpen}
	<div class='relative z-10' role='dialog' aria-modal='true'>
		<div class='fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity'></div>
		<div class='fixed z-10 inset-0 overflow-y-auto'>
			<div class='flex flex-col items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
				<div class='modal-content {className}'>
					<slot />
				</div>
			</div>
		</div>
	</div>
{/if}
