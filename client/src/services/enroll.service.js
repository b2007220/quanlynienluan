import createClient from '../utils/client';

class EnrollService {
	#client;

	constructor() {
		this.#client = createClient('enroll');
	}

	async createEnroll(enroll) {
		const newenroll = await this.#client.post('/', enroll);

		return newenroll;
	}

	async getAllEnrolls(page = 0) {
		const enrolls = await this.#client.get('/', {
			params: {
				page,
			},
		});

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

	async getEnrollsFromTeacher(page = 0, teacherId) {
		const enrolls = await this.#client.get(`/teacher/${teacherId}`, {
			params: {
				page,
			},
		});

		return enrolls;
	}
}

export default new EnrollService();
