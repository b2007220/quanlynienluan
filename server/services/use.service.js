const { PrismaClient } = require('@prisma/client');

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

	async getAll() {
		const uses = await this.#client.use.findMany();

		return uses;
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
}

module.exports = new UseService();
