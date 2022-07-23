<script lang='ts'>
	import { Button, Modal, ModalBody, ModalFooter, Text, Input, ModalHeader } from '../../core';
	import { handleLogin, isAuthenticated } from '../../../store/auth.store';
	import type { LoginData } from '../../../store/auth.store';
	import ThemeSwitchButton from './ThemeSwitchButton.svelte';
	import handleForm from '../../../config/Form/handleForm';
	import * as Yup from 'yup';
	import logo from '../../../assets/images/logo.png';
	import { Spinner } from '../../core/index.js';

	const { userState, loginAction } = handleLogin;

	const validationSchema = Yup.object().shape({
		username: Yup.string().required(),
		password: Yup.string().min(6, 'Password must be at least 6 characters.').required('Password is Required!'),
	});

	const { values, handleChange, handleBlur, touched, handleSubmit, errors } = handleForm({
		initialValues: { username: '', password: '' },
		onSubmit: (data: LoginData) => handleFormSubmit(data),
		validationSchema,
	});

	const handleFormSubmit = (data: LoginData) => {
		console.log('$values, $touched, data');
		console.log($values, $touched, data);
		loginAction(data);
	};

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
						<div>{$errors.username}</div>
					{/if}
				</div>
				<div class='mt-3'>
					<Text>Password</Text>
					<Input name='password' type='password' value='{$values.password}' onInput='{handleChange}'
								 onBlur='{handleBlur}' />
					{#if $errors.password && $touched.password}
						<div>{$errors.password}</div>
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
