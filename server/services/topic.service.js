const { PrismaClient, State } = require('@prisma/client');

const semesterService = require('./semester.service');

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

	async getAll() {
		const topics = await this.#client.topic.findMany();
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

	async createAndUse(enroll,user){
		const semester = await semesterService.getCurrent();
		const topic = await this.#client.topic.create({
			data:{
				name : enroll.name,
				describe: enroll.describe,
				type: enroll.type,
				isChecked: false,
			}
		})
		const use = await this.#client.use.create({
			data:{
				topicId: topic.id,
				userId: enroll.teacherId,
				semesterId: semester.id,
			}
		})
		const newEnroll = await this.#client.enroll.create({
			data:{
				userId: user.id,
				useId: use.id,
				state: State.PROPOSE,
			}
		})
		return newEnroll;
	}
}

module.exports = new TopicService();
