import createClient from '../utils/client';

class GradeService {
	#client;

	constructor() {
		this.#client = createClient('grades');
	}

	async createGrade(grade) {
		const newgrade = await this.#client.post('/', grade);

		return newgrade;
	}

	async getAllGrades() {
		const grades = await this.#client.get('/');

		return grades;
	}

	async getGradeById(id) {
		const grade = await this.#client.get(`/${id}`);

		return grade;
	}

	async updateGradeById(id, grade) {
		const updatedgrade = await this.#client.put(`/${id}`, grade);

		return updatedgrade;
	}

	async deletegradeById(id) {
		await this.#client.delete(`/${id}`);
	}

	async getGradeByStudentId(userId) {
		const grades = await this.#client.get(`/student/${userId}`);

		return grades;
	}
}

export default new GradeService();
