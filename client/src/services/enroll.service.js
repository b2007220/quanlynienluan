import createClient from '../utils/client';

class EnrollService {
	#client;

	constructor() {
		this.#client = createClient('enrolls');
	}

	async createEnroll(enroll) {
		const newenroll = await this.#client.post('/', enroll);

		return newenroll;
	}

	async getAllEnrolls() {
		const enrolls = await this.#client.get('/');

		return enrolls;
	}

	async getEnrollById(id) {
		const enroll = await this.#client.get(`/${id}`);

		return enroll;
	}

	async updateEnrollById(id, enroll) {
		const updatedenroll = await this.#client.put(`/${id}`, enroll);

		return updatedenroll;
	}

	async deleteEnrollById(id) {
		await this.#client.delete(`/${id}`);
	}
}

export default new EnrollService();
