const { PrismaClient } = require('@prisma/client');

class YearService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(year) {
		const newyear = await this.#client.year.create({
			data: year,
		});

		return newyear;
	}

	async getAll() {
		const years = await this.#client.year.findMany();

		return years;
	}

	async getById(id) {
		const year = await this.#client.year.findUnique({
			where: {
				id: parseInt(id),
			},
		});

		return year;
	}

	async update(id, year) {
		const updatedyear = await this.#client.year.update({
			where: {
				id: parseInt(id),
			},
			data: year,
		});

		return updatedyear;
	}

	async delete(id) {
		const deletedyear = await this.#client.year.delete({
			where: {
				id: parseInt(id),
			},
		});

		return deletedyear;
	}
}

module.exports = new YearService();
