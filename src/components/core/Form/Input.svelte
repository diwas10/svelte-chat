<script lang='ts'>
	export let placeholder;
	export let name;
	export let type: 'text' | 'number' | 'password' = 'text';
	export let className = '';
	export let value = '';

	const handleInputChange = (e) => {
		value = e.target.value;
	};

</script>

<input
	{type}
	{name}
	class='form-control {className}'
	{placeholder}
	on:input={(e)=>handleInputChange(e)}
>