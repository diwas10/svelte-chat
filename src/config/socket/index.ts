import { io } from 'socket.io-client';
import { getEnvVar } from '../../utils/getEnvVariable';
import TokenService from '../../service/Token/token.service';

const URL = getEnvVar('VITE_ENDPOINT');
const socket = io(URL, { extraHeaders: { Authorization: `Bearer ${TokenService.getToken()}` } });

socket.onAny((event, ...args) => {
	console.log(event, args);
	console.log('User Disconasdddddddddddddddddddddddnedyed');
});

socket.on('disconnect', () => {
	console.log('User Disconnedyed');
});

export default socket;
