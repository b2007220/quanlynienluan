import createClient from '../utils/client';

class UseService {
	#client;

	constructor() {
		this.#client = createClient('use');
	}

	async createUse(use) {
		const newuse = await this.#client.post('/', use);

		return newuse;
	}
	async getAllUses(page = 0) {
		const uses = await this.#client.get('/', {
			params: {
				page,
			},
		});

		return uses;
	}

	async getUseById(id) {
		const use = await this.#client.get(`/${id}`);

		return use;
	}

	async updateUseById(id, use) {
		const updateduse = await this.#client.put(`/${id}`, use);

		return updateduse;
	}

	async deleteUseById(id) {
		await this.#client.delete(`/${id}`);
	}

	async getAllUsesInSemester(page = 0) {
		const uses = await this.#client.get(`/semester`, {
			params: {
				page,
			},
		});

		return uses;
	}

	async getUsesFromTeacher(info, page = 0) {
		const uses = await this.#client.get(`/teacher`, {
			params: {
				...info,
				page,
			},
		});
		return uses;
	}
	async getUsesFromIncharge(page = 0) {
		const uses = await this.#client.get(`/incharge`, {
			params: {
				page,
			},
		});
		return uses;
	}
	async createTopicAndUse(value){
		const use = await this.#client.post(`/use`, value);
		return use;
	}
}

export default new UseService();
