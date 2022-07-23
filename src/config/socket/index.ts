import { io } from 'socket.io-client';
import { getEnvVar } from '../../utils/getEnvVariable';

const URL = getEnvVar('VITE_ENDPOINT');
const Socket = io(URL);

Socket.onAny((event, ...args) => {
	console.log(event, args);
});

export default Socket;
