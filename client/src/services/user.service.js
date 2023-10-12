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

	async getAllUsers(page = 0) {
		const users = await this.#client.get('/', {
			params: {
				page,
			},
		});
		return users;
	}
	async getAllTeachers() {
		const users = await this.#client.get('/teachers');
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

	async activeUser(id) {
		const updatedUser = await this.#client.patch(`/${id}`);

		return updatedUser;
	}

	async unActiveUser(id) {
		const updatedUser = await this.#client.patch(`/${id}/unactive`);

		return updatedUser;
	}

	async changeTeacher(id) {
		const updatedUser = await this.#client.patch(`/${id}/teacher`);

		return updatedUser;
	}

	async changeStudent(id) {
		const updatedUser = await this.#client.patch(`/${id}/student`);

		return updatedUser;
	}

	async changeAdmin(id) {
		const updatedUser = await this.#client.patch(`/${id}/admin`);

		return updatedUser;
	}
	async changePassword(oldPassword, newPassword) {
		const updatedUser = await this.#client.patch(`/password/change`, { oldPassword, newPassword });

		return updatedUser;
	}
	async createPassword(password) {
		const updatedUser = await this.#client.patch(`/password/create`, { password });

		return updatedUser;
	}
}

export default new UserService();
