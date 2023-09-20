const { PrismaClient } = require('@prisma/client');

class MajorService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(major) {
		const newmajor = await this.#client.major.create({
			data: major,
		});

		return newmajor;
	}

	async getAll(page = 0, limit = 10) {
		const majors = await this.#client.major.findMany({
			skip: page * limit,
			take: limit,
		});

		return {
			data: majors,
			page,
			limit,
			total: Math.floor((await this.#client.major.count()) / limit + 0.9),
		};
	}

	async getById(id) {
		const major = await this.#client.major.findUnique({
			where: {
				id: parseInt(id),
			},
		});

		return major;
	}

	async update(id, major) {
		const updatedMajor = await this.#client.major.update({
			where: {
				id: parseInt(id),
			},
			data: major,
		});

		return updatedMajor;
	}

	async delete(id) {
		const deletedMajor = await this.#client.major.delete({
			where: {
				id: parseInt(id),
			},
		});

		return deletedMajor;
	}
}

module.exports = new MajorService();
