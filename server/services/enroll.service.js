const { PrismaClient } = require('@prisma/client');

class EnrollService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(enroll) {
		const newEnroll = await this.#client.enroll.create({
			data: enroll,
		});

		return newEnroll;
	}

	async getAll(id) {
		const enrolls = await this.#client.enroll.findMany({
			where: {
				id: parseInt(id),
			},
		});

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
}

module.exports = new EnrollService();
