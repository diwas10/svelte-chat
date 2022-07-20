import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_SOCKET_ENDPOINT;
const Socket = io(URL);

Socket.onAny((event, ...args) => {
	console.log(event, args);
});

export default Socket;
