<script lang='ts'>
	export let variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'display1' | 'display2' = 'p';
	export let className = '';
	export let typeface: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' = 'normal';
	export let darkFont: string;
	export let lightFont: string;

	const switchClassName = () => {
		switch (variant) {
			case 'display2':
				return 'text-xs';
			case 'display1':
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
</script>

<svelte:element
	this={variant}
	class='{switchClassName() + ` ${darkFont ?? "dark:text-dark-w"} ${lightFont ?? "text-gray-900"} font-${typeface} ${className}`}'
>
	<slot></slot>
</svelte:element>

