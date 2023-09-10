const { PrismaClient } = require('@prisma/client');

class TopicService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(topic) {
		const newTopic = await this.#client.topic.create({
			data: topic,
		});

		return newTopic;
	}

	async getAll(id) {
		const topics = await this.#client.topic.findMany({
			where: {
				id: parseInt(id),
			},
		});

		return topics;
	}

	async getById(id) {
		const topic = await this.#client.topic.findUnique({
			where: {
				id: parseInt(id),
			},
		});

		return topic;
	}

	async update(id, topic) {
		const updatedTopic = await this.#client.topic.update({
			where: {
				id: parseInt(id),
			},
			data: topic,
		});

		return updatedTopic;
	}

	async delete(id) {
		const deletedTopic = await this.#client.topic.delete({
			where: {
				id: parseInt(id),
			},
		});

		return deletedTopic;
	}
}

module.exports = new TopicService();
