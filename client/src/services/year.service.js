import createClient from '../utils/client';

class YearService {
	#client;

	constructor() {
		this.#client = createClient('year');
	}

	async createYear(year) {
		const newyear = await this.#client.post('/', year);

		return newyear;
	}

	async getAllYears() {
		const years = await this.#client.get('/');

		return years;
	}

	async getYearById(id) {
		const year = await this.#client.get(`/${id}`);

		return year;
	}

	async updateYearById(id, year) {
		const updatedyear = await this.#client.put(`/${id}`, year);

		return updatedyear;
	}

	async deleteYearById(id) {
		await this.#client.delete(`/${id}`);
	}
}

export default new YearService();
