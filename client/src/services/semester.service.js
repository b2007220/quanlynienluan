import createClient from '../utils/client';

class SemesterService {
	#client;

	constructor() {
		this.#client = createClient('semester');
	}

	async createSemester(semester) {
		const newsemester = await this.#client.post('/', semester);

		return newsemester;
	}

	async getAllSemesters(page = 0) {
		const semesters = await this.#client.get('/', {
			params: {
				page,
			},
		});

		return semesters;
	}

	async getSemesterById(id) {
		const semester = await this.#client.get(`/${id}`);

		return semester;
	}

	async updateSemesterById(id, semester) {
		const updatedsemester = await this.#client.put(`/${id}`, semester);

		return updatedsemester;
	}

	async deleteSemesterById(id) {
		await this.#client.delete(`/${id}`);
	}

	async getEnrollsByStudentIdInSemester(studentId, semesterId) {
		await this.#client.get(`/${semesterId}/enrolls/${studentId}`);
	}

	async getSemestersByYearName(year) {
		const semesters = await this.#client.get(`/${year}/semesters`);

		return semesters;
	}
	async getCurrent() {
		const semester = await this.#client.get('/current');
		return semester;
	}
}

export default new SemesterService();
