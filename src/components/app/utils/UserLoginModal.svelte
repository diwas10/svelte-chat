<script lang='ts'>
	import type { LoginData } from '../../../store/auth.store';
	import { isAuthenticated, loginAction, userState } from '../../../store/auth.store';

	import * as Yup from 'yup';
	import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Text } from '../../core';
	import ThemeSwitchButton from './ThemeSwitchButton.svelte';
	import { handleForm } from '../../../config/Form';
	import logo from '../../../assets/images/logo.png';

	const validationSchema = Yup.object().shape({
		username: Yup.string().required('Username is Required!'),
		password: Yup.string().min(6, 'Password must be at least 6 characters.').required('Password is Required!'),
	});

	const { values, handleChange, handleBlur, touched, handleSubmit, errors } = handleForm({
		initialValues: { username: '', password: { name: false } },
		onSubmit: (data: LoginData) => loginAction(data),
		validationSchema,
	});

	touched.subscribe(touch => console.log(touch));

</script>

<div class='absolute top-4 right-4 z-20'>
	<ThemeSwitchButton />
</div>
<div class='bg-white'>
	<Modal isOpen='{!($isAuthenticated)}'>
		<ModalHeader>
			<div class='text-center w-full flex justify-center items-center flex-col'>
				<div class='p-5 bg-primary bg-opacity-10 rounded-full mb-4 h-20 w-20'>
					<img src='{logo}' alt=''>
				</div>
				<Text variant='h3' typeface='semibold' className='text-center'>Login or Register to Continue</Text>
			</div>
		</ModalHeader>
		<form on:submit='{handleSubmit}'>
			<ModalBody className='text-left'>
				<div>
					<Text>Username</Text>
					<Input name='username' value='{$values.username}' onInput='{handleChange}' onBlur='{handleBlur}' />
					{#if $errors.username && $touched.username}
						<Text variant='display2' color='text-red-600'>{$errors.username}</Text>
					{/if}
				</div>
				<div class='mt-3'>
					<Text>Password</Text>
					<Input name='password' type='password' value='{$values.password}' onInput='{handleChange}'
								 onBlur='{handleBlur}' />
					{#if $errors.password && $touched.password}
						<Text variant='display2' color='text-red-600'>{$errors.password}</Text>
					{/if}
				</div>
			</ModalBody>
			<ModalFooter>
				<Button className='w-full'>
					{#if $userState.loading}
						<Spinner size='sm' />
					{:else }
						Continue
					{/if}
				</Button>
			</ModalFooter>
		</form>
	</Modal>
</div>
