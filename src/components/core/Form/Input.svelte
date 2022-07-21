<script lang='ts'>
	import { afterUpdate } from 'svelte';
	import { chatUsers } from '../../../store/chat.store';

	export let placeholder = '';
	export let name;
	export let type: 'text' | 'number' | 'password' = 'text';
	export let className = '';
	export let value;
	export let id = name;

	const handleInputChange = (e) => {
		value = e.target.value;
	};

	afterUpdate(() => {
		console.log(value, 'value');
	});

</script>

<input
	{type}
	{name}
	{value}
	{id}
	{placeholder}
	on:input={(e)=>handleInputChange(e)}
	class='form-control {className}'
>
