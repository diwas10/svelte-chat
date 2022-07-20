<script lang='ts'>
	import { Button, Modal, ModalBody, ModalFooter, Text, ModalHeader, Input } from '../../core';
</script>
<Modal isOpen='{true}'>
	<ModalBody className='text-left'>
		<Text variant='h3' typeface='medium'>Login or Register To Continue</Text>
		<div class='mt-5'>
			<Text darkFont='text-gray-400'>Username</Text>
			<Input className='mt-1' />
		</div>
		<div class='mt-3'>
			<Text darkFont='text-gray-400'>Password</Text>
			<Input />
		</div>
	</ModalBody>
	<ModalFooter>
		<Button>Login</Button>
	</ModalFooter>
</Modal>
