<script lang='ts'>
	import { Button, Modal, ModalBody, ModalFooter, Text, Input, ModalHeader } from '../../core';
	import { isAuthenticated } from '../../../store/auth.store.js';
	import ThemeSwitchButton from './ThemeSwitchButton.svelte';

	let values = '';

	const handleSubmit = () => {
		console.log(values);
	};

</script>

<div class='absolute top-4 right-4 z-20'>
	<ThemeSwitchButton />
</div>
<div class='bg-white'>
	<Modal isOpen='{!($isAuthenticated)}'>
		<ModalHeader>
			<div class='text-center w-full flex justify-center items-center flex-col'>
				<div class='p-3 bg-primary bg-opacity-10 rounded-full mb-4 h-16 w-16'>
					<svg xmlns='http://www.w3.org/2000/svg' class='h-full w-full fill-primary' viewBox='0 0 20 20'>
						<path fill-rule='evenodd'
									d='M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z'
									clip-rule='evenodd' />
					</svg>
				</div>
				<Text variant='h3' typeface='semibold' className='text-center'>Login or Register to Continue</Text>
			</div>
		</ModalHeader>
		<form on:submit|preventDefault='{handleSubmit}'>
			<ModalBody className='text-left'>
				<div>
					<Text darkFont='text-gray-400'>Username</Text>
					<Input name='username' value='{values}' />
				</div>
				<div class='mt-3'>
					<Text darkFont='text-gray-400'>Password</Text>
					<!--					<Input name='password' type='password' value='{values}' />-->
				</div>
			</ModalBody>
			<ModalFooter>
				<Button className='w-full'>Login</Button>
			</ModalFooter>
		</form>
	</Modal>
</div>
