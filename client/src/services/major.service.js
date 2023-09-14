import createClient from '../utils/client';

class MajorService {
	#client;

	constructor() {
		this.#client = createClient('majors');
	}

	async createMajor(major) {
		const newmajor = await this.#client.post('/', major);

		return newmajor;
	}

	async getAllMajors() {
		const majors = await this.#client.get('/');

		return majors;
	}

	async getMajorById(id) {
		const major = await this.#client.get(`/${id}`);

		return major;
	}

	async updateMajorById(id, Major) {
		const updatedmajor = await this.#client.put(`/${id}`, major);

		return updatedmajor;
	}

	async deleteMajorById(id) {
		await this.#client.delete(`/${id}`);
	}
}

export default new MajorService();
