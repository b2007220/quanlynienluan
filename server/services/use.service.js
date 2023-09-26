const { PrismaClient } = require('@prisma/client');
const semesterService = require('./semester.service');

class UseService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(use) {
		const newUse = await this.#client.use.create({
			data: use,
		});

		return newUse;
	}

	async getAll(page = 0, limit = 6) {
		const uses = await this.#client.use.findMany({
			where: {
				topic: {
					isChecked: true,
				},
			},
			include: {
				topic: true,
			},
			skip: page * limit,
			take: limit,
		});

		return {
			data: uses,
			page,
			limit,
			total: Math.floor((await this.#client.user.count()) / limit + 0.9),
		};
	}

	async getAllFromUser(userId) {
		const uses = await this.#client.use.findMany();
		({
			where: {
				user: {
					id: userId,
				},
			},
			include: {
				user: true,
			},
		});

		return uses;
	}
	async getById(id) {
		const use = await this.#client.use.findUnique({
			where: {
				id: parseInt(id),
			},
		});

		return use;
	}

	async update(id, use) {
		const updateduse = await this.#client.use.update({
			where: {
				id: parseInt(id),
			},
			data: use,
		});

		return updateduse;
	}

	async delete(id) {
		const deleteduse = await this.#client.use.delete({
			where: {
				id: parseInt(id),
			},
		});

		return deleteduse;
	}

	async getUseByStudentIdInSemester(userId) {
		const use = await this.#client.use.findUnique({
			where: {
				enroll: {
					userId,
				},
			},
			include: {
				enroll: true,
			},
		});
		return use;
	}

	async getAllInSemester(page = 0, limit = 6) {
		const uses = await this.#client.use.findMany({
			where: {
				topic: {
					isChecked: true,
				},
				semesterId: semesterService.getCurrentSemesterId(),
			},
			include: {
				topic: true,
			},
			skip: page * limit,
			take: limit,
		});

		return {
			data: uses,
			page,
			limit,
			total: Math.floor((await this.#client.user.count()) / limit + 0.9),
		};
	}
}

module.exports = new UseService();
