import { io, Socket } from 'socket.io-client';
import { getEnvVar } from '../../utils/getEnvVariable';
import TokenService from '../../service/Token/token.service';

class SocketController {
	public URL: string;
	public socket: Socket;
	private readonly instance: SocketController;

	constructor() {
		if (this.instance) return this.instance;

		this.URL = getEnvVar('VITE_ENDPOINT');
		this.socket = io(this.URL, {
			extraHeaders: { Authorization: `Bearer ${TokenService.getToken()}` },
			autoConnect: false,
		});

		this.instance = this;
		this.init();
	}

	private init(): void {
		this.socket.connect();
		this.socket.onAny((event, ...args) => {
			console.log(event, args);
		});

		this.socket.on('disconnect', () => {
			console.log('User Disconnected');
		});
	}

	public emit(event: string, payload: any): void {
		this.socket.emit(event, { ...payload });
	}

	public on(event: string, listener: (...args: any[]) => void) {
		this.socket.on(event, listener);
	}
}

export default SocketController;
