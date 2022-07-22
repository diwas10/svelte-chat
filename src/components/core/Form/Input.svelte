<script lang='ts'>
	import type { InputChangeEvent, InputFocusEvent } from '../../../config/Form/form.schema';

	export let placeholder = '';
	export let name;
	export let type: 'text' | 'number' | 'password' = 'text';
	export let className = '';
	export let onInput: (e: InputChangeEvent<HTMLInputElement>) => void;
	export let onBlur: (e: InputFocusEvent<HTMLInputElement>) => void;
	export let value = '';

</script>

<input
	{type}
	{name}
	{value}
	{placeholder}
	on:input={onInput}
	class='form-control {className}'
	on:blur={onBlur}
>
