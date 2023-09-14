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

	async getAll() {
		const majors = await this.#client.major.findMany();

		return majors;
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
