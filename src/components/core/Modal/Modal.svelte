<script>
	import classNames from 'classnames';

	export let className = '';
	export let isOpen = false;
	export let size = 'md';

	const classes = classNames({ className, [`modal-${size}`]: `modal-${size}` });
</script>
{#if isOpen}
	<div class='relative z-10' role='dialog' aria-modal='true'>
		<div class='fixed inset-0 dark:bg-dark-3 bg-opacity-50 bg-gray-300 transition-opacity backdrop-blur-xl'></div>
		<div class='fixed z-10 inset-0 overflow-y-auto'>
			<div class='flex flex-col items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
				<div class='modal-content {classes}'>
					<slot />
				</div>
			</div>
		</div>
	</div>
{/if}
