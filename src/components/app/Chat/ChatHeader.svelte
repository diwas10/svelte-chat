<script lang='ts'>
	import ThemeSwitchButton from '../utils/ThemeSwitchButton.svelte';
	import { Button, Text } from '../../core';
	import TokenService from '../../../service/Token/token.service';
	import { isAuthenticated } from '../../../store/auth.store';

	const handleLogout = () => {
		TokenService.clearToken();
		isAuthenticated.update(() => false);
	};

</script>

<header class='flex justify-between p-4'>
	<Text variant='h2' typeface='semibold' className='flex-grow text-center'>Santosh</Text>
	<div class='flex'>
		<Button variant='close' className='mr-3' onClick='{handleLogout}'>
			<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
				<path fill-rule='evenodd'
							d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
							clip-rule='evenodd' />
			</svg>
		</Button>
		<ThemeSwitchButton />
	</div>
</header>
