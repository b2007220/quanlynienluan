const { PrismaClient } = require('@prisma/client');

class SemesterService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(semester) {
		const newsemester = await this.#client.semester.create({
			data: semester,
		});

		return newsemester;
	}

	async getAll() {
		const semesters = await this.#client.semester.findMany({
			include: {
				year: true,
			},
		});
		return semesters;
	}

	async getById(id) {
		const semester = await this.#client.semester.findUnique({
			where: {
				id: parseInt(id),
			},
		});

		return semester;
	}

	async update(id, semester) {
		const updatedsemester = await this.#client.semester.update({
			where: {
				id: parseInt(id),
			},
			data: semester,
		});

		return updatedsemester;
	}

	async delete(id) {
		const deletedsemester = await this.#client.semester.delete({
			where: {
				id: parseInt(id),
			},
		});

		return deletedsemester;
	}

	async getSemestersByYearId(year) {
		const semesters = await this.#client.semester.findMany({
			where: {
				year: parseInt(year),
			},
		});

		return semesters;
	}
	async getCurrentSemester() {
		const semester = await this.#client.semester.findUnique({
			where: {
				isCurrent: true,
			},
		});
		return semester;
	}
}

module.exports = new SemesterService();
