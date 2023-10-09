const { PrismaClient } = require('@prisma/client');
const semesterService = require('./semester.service');

class UseService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(use) {
		const newUse = await this.#client.use.create({
			data: {
				userId: use.user.id,
				topicId: use.topicId,
				semesterId: use.semesterId,
			},
			include: {
				topic: true,
			},
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
			include: {
				topic: true,
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
		await this.#client.use.delete({
			where: {
				id: parseInt(id),
			},
		});
		return true;
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
				semester: semesterService.getCurrent(),
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
	async getUsesFromIncharge(page = 0, limit = 6, user) {
		const uses = await this.#client.use.findMany({
			where: {
				topic: {
					isChecked: true,
				},
				userIncharge: {
					id: parseInt(user.id),
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
			total: Math.floor((await this.#client.use.count()) / limit + 0.9),
		};
	}
	async getUsesFromTeacher(page = 0, limit = 6, info) {
		const uses = await this.#client.use.findMany({
			where: {
				topic: {
					isChecked: true,
					type: info.type,
				},
				userIncharge: {
					id: parseInt(info.teacherId),
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
			total: Math.floor((await this.#client.use.count()) / limit + 0.9),
		};
	}
}

module.exports = new UseService();
