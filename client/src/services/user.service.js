import createClient from '../utils/client';

class UserService {
	#client;

	constructor() {
		this.#client = createClient('users');
	}

	async createUser(user) {
		const newUser = await this.#client.post('/', user);

		return newUser;
	}

	async getAllUsers() {
		const users = await this.#client.get('/');

		return users;
	}

	async getUserById(id) {
		const user = await this.#client.get(`/${id}`);

		return user;
	}

	async updateUserById(id, user) {
		const updatedUser = await this.#client.put(`/${id}`, user);

		return updatedUser;
	}

	async deleteUserById(id) {
		await this.#client.delete(`/${id}`);
	}
}

export default new UserService();
