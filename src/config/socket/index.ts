import { io, Socket } from 'socket.io-client';
import { getEnvVar } from '../../utils/getEnvVariable';
import TokenService from '../../service/Token/token.service';

class SocketController {
	public static URL: string;
	public static socket: Socket;
	private readonly instance: SocketController;

	constructor() {
		if (this.instance) return this.instance;

		SocketController.URL = getEnvVar('VITE_ENDPOINT');
		SocketController.socket = io(SocketController.URL, {
			extraHeaders: { Authorization: `Bearer ${TokenService.getToken()}` },
			autoConnect: false,
		});

		this.instance = this;
		this.init();
	}

	private init(): void {
		SocketController.socket.connect();
		SocketController.socket.onAny((event, ...args) => {
			console.log(event, args);
		});

		SocketController.socket.on('disconnect', () => {
			console.log('User Disconnected');
		});
	}

	public static emit(event: string, payload: any): void {
		this.socket.emit(event, { ...payload });
	}

	public static on(event: string, listener: (...args: any[]) => void) {
		this.socket.on(event, listener);
	}

}

export default SocketController;
