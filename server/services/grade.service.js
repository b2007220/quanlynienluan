const { PrismaClient } = require('@prisma/client');
const { grade } = require('../prisma');

class GradeService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(grade) {
		const newgrade = await this.#client.grade.create({
			data: grade,
		});

		return newgrade;
	}

	async getAll() {
		const grades = await this.#client.grade.findMany();
		return grades;
	}

	async getById(id) {
		const grade = await this.#client.grade.findUnique({
			where: {
				id: parseInt(id),
			},
		});

		return grade;
	}

	async update(id, grade) {
		const updatedgrade = await this.#client.grade.update({
			where: {
				id: parseInt(id),
			},
			data: grade,
		});

		return updatedgrade;
	}

	async delete(id) {
		const deletedgrade = await this.#client.grade.delete({
			where: {
				id: parseInt(id),
			},
		});

		return deletedgrade;
	}

	async getGradesFromUser(userId) {
		const grade = await this.#client.grade.findUnique({
			where: {
				enroll: {
					userId,
				},
			},
			include: {
				enroll: true,
			},
		});
		return grade;
	}
}

module.exports = new GradeService();
