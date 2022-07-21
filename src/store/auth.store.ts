import { writable } from 'svelte/store';
import TokenService from '../service/Token/token.service';

const isAuthenticated = writable(!!TokenService.getToken());
const user = writable(TokenService.getTokenData());

export { isAuthenticated, user };
