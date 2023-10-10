const { PrismaClient, Role, Type } = require('@prisma/client');
const semesterService = require('./semester.service');
class EnrollService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(enroll) {
		const newEnroll = await this.#client.enroll.create({
			data: {
				useId: enroll.useId,
				userId: enroll.userId,
			},
		});

		return newEnroll;
	}

	async createEnrollFromUse(use, user) {
		const newEnroll = await this.#client.enroll.create({
			data: {
				useId: use.id,
				userId: user.id,
			},
		});

		return newEnroll;
	}

	async getAll() {
		const enrolls = await this.#client.enroll.findMany();

		return enrolls;
	}

	async getById(id) {
		const enroll = await this.#client.enroll.findUnique({
			where: {
				id: parseInt(id),
			},
		});

		return enroll;
	}

	async update(id, enroll) {
		const updatedEnroll = await this.#client.enroll.update({
			where: {
				id: parseInt(id),
			},
			data: enroll,
		});

		return updatedEnroll;
	}

	async delete(id) {
		const deletedEnroll = await this.#client.enroll.delete({
			where: {
				id: parseInt(id),
			},
		});

		return deletedEnroll;
	}

	async getByTeacherId(id, page = 0, limit = 10) {
		const enrolls = await this.#client.enroll.findMany({
			where: {
				use: {
					userId: parseInt(id),
				},
			},
			include: {
				use: true,
				user: true,
				use: {
					include: {
						semester: true,
						topic: true,
					},
				},
			},
			skip: page * limit,
			take: limit,
		});
		return {
			data: enrolls,
			page,
			limit,
			total: Math.floor((await this.#client.user.count()) / limit + 0.9),
		};
	}

	async getFromStudent(id) {
		const enroll = await this.#client.enroll.findFirst({
			where: {
				userId: parseInt(id),
				use: {
					semester: semesterService.getCurrent(),
				},
			},
			include: {
				use: true,
			},
		});

		return enroll;
	}
	async haveEnroll(id) {
		const enroll = await this.#client.enroll.findMany({
			where: {
				userId: parseInt(id),
				use: {
					semester: semesterService.getCurrent(),
				},
			},
			include: {
				use: true,
			},
		});
		console.log(enroll);
		return enroll.length > 0;
	}
	async getByTeacherBasisId(id, page = 0, limit = 10) {
		const enrolls = await this.#client.enroll.findMany({
			where: {
				use: {
					userId: parseInt(id),
					topic: {
						type: Type.BASIS,
					},
					semester: semesterService.getCurrent(),
				},
			},
			include: {
				use: true,
				user: true,
				use: {
					include: {
						topic: true,
					},
				},
			},
			skip: page * limit,
			take: limit,
		});
		return {
			data: enrolls,
			page,
			limit,
			total: Math.floor((await this.#client.user.count()) / limit + 0.9),
		};
	}
	async getByTeacherMasterId(id, page = 0, limit = 10) {
		const enrolls = await this.#client.enroll.findMany({
			where: {
				use: {
					userId: parseInt(id),
					topic: {
						type: Type.MASTER,
					},
					semester: semesterService.getCurrent(),
				},
			},
			include: {
				use: true,
				user: true,
				use: {
					include: {
						topic: true,
					},
				},
			},
			skip: page * limit,
			take: limit,
		});
		return {
			data: enrolls,
			page,
			limit,
			total: Math.floor((await this.#client.user.count()) / limit + 0.9),
		};
	}
}

module.exports = new EnrollService();
