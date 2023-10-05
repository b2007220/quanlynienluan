const { PrismaClient } = require('@prisma/client');

class SemesterService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(semester) {
		const newsemester = await this.#client.semester.create({
			data: semester,
			include: {
				year: true,
			},
		});

		return newsemester;
	}

	async getAll(page = 0, limit = 10) {
		const semesters = await this.#client.semester.findMany({
			skip: page * limit,
			take: limit,
			include: {
				year: true,
			},
		});
		return {
			data: semesters,
			page,
			limit,
			total: Math.floor((await this.#client.semester.count()) / limit + 0.9),
		};
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
		const semester = await this.#client.semester.findMany({
			where: {
				isCurrent: true,
			},
		});
		return semester;
	}
	async activeSemester(id) {
		await this.#client.semester.updateMany({
			where: {
				isCurrent: true,
			},
			data: {
				isCurrent: false,
			},
		});
		const semester = await this.#client.semester.update({
			where: {
				id: parseInt(id),
			},
			data: {
				isCurrent: true,
			},
			include: {
				year: true,
			},
		});
		return semester;
	}
}

module.exports = new SemesterService();
