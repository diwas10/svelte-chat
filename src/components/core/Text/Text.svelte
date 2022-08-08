<script lang='ts'>
	import classNames from 'classnames';

	export let variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small' = 'p';
	export let className = '';
	export let typeface: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' = 'normal';
	export let darkFontClass = '';
	export let lightFont = '';

	const switchClassName = () => {
		switch (variant) {
			case 'small':
				return 'text-sm';
			case 'p' | 'h6' :
				return 'text-base';
			case 'h5':
				return 'text-lg';
			case 'h4':
				return 'text-xl';
			case 'h3':
				return 'text-2xl';
			case 'h2':
				return 'text-3xl';
			case 'h1':
				return 'text-4xl';
			default:
				return 'text-base';
		}
	};

	const classes = classNames(switchClassName(), `font-${typeface}`, className, lightFont ?? 'text-gray-800', {
		[`dark:${darkFontClass}`]: !!darkFontClass,
		['dark:text-dark-w']: !darkFontClass,
	});
</script>

<svelte:element this={variant} class='{classes}'>
	<slot></slot>
</svelte:element>

