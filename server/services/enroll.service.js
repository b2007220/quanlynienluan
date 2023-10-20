const { PrismaClient, Type } = require('@prisma/client');
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
			include: {
				use: true,
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
			include: {
				user: true,

				use: {
					include: {
						semester: {
							include: {
								year: true,
							},
						},
						topic: true,
					},
				},
			},
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

	async getByTeacherId(id, page = 0, limit = 6) {
		const enrolls = await this.#client.enroll.findMany({
			where: {
				use: {
					userId: parseInt(id),
				},
			},
			include: {
				user: true,

				use: {
					include: {
						semester: {
							include: {
								year: true,
							},
						},
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
			total: Math.floor(
				(await this.#client.enroll.count({
					where: {
						use: {
							userId: parseInt(id),
						},
					},
				})) /
					limit +
					0.9,
			),
		};
	}

	async getFromStudent(id) {
		const semester = await semesterService.getCurrent();
		const enroll = await this.#client.enroll.findFirst({
			where: {
				userId: parseInt(id),
				use: {
					semesterId: semester.id,
				},
			},
			include: {
				use: {
					include: {
						topic: true,
					},
				},
			},
		});

		return enroll;
	}
	async haveEnroll(id) {
		const semester = await semesterService.getCurrent();

		return !!(await this.#client.enroll.findUnique({
			where: {
				userId: id,
				use: {
					semesterId: semester.id,
				},
			},
		}));
	}
	async getByTeacherBasisId(id, page = 0, limit = 6) {
		const semester = await semesterService.getCurrent();
		const enrolls = await this.#client.enroll.findMany({
			where: {
				use: {
					userId: parseInt(id),
					topic: {
						type: Type.BASIS,
					},
					semesterId: semester.id,
				},
			},
			include: {
				user: true,

				use: {
					include: {
						semester: {
							include: {
								year: true,
							},
						},
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
			total: Math.floor(
				(await this.#client.enroll.count({
					where: {
						use: {
							userId: parseInt(id),
							topic: {
								type: Type.BASIS,
							},
							semesterId: semester.id,
						},
					},
				})) /
					limit +
					0.9,
			),
		};
	}
	async getByTeacherMasterId(id, page = 0, limit = 6) {
		const semester = await semesterService.getCurrent();
		const enrolls = await this.#client.enroll.findMany({
			where: {
				use: {
					userId: parseInt(id),
					topic: {
						type: Type.MASTER,
					},
					semesterId: semester.id,
				},
			},
			include: {
				user: true,
				use: {
					include: {
						semester: {
							include: {
								year: true,
							},
						},
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
			total: Math.floor(
				(await this.#client.enroll.count({
					where: {
						use: {
							userId: parseInt(id),
							topic: {
								type: Type.MASTER,
							},
							semesterId: semester.id,
						},
					},
				})) /
					limit +
					0.9,
			),
		};
	}
}

module.exports = new EnrollService();
