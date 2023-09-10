import createClient from '../utils/client';

class AuthService {
	#client;
	constructor() {
		this.#client = createClient('auth/');
	}
	async login({ email, password }) {
		return await this.#client.post('login', { email, password });
	}
	async signInWithIdToken(token) {
		return await this.#client.post('login-with-id-token', { token });
	}
	async getUserProfile() {
		return await this.#client('');
	}
}

export default new AuthService();
