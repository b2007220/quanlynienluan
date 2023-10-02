import createClient from '../utils/client';

class UseService {
	#client;

	constructor() {
		this.#client = createClient('uses');
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

	async getAllUsesInSemester() {
		const uses = await this.#client.get(`/semester`);

		return uses;
	}

	// async getUsesFromTeacher(info){
	// 	const uses = await this.#client.get(`/${info./teacher`),
	// }
}

export default new UseService();
