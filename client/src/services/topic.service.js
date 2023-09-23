import createClient from '../utils/client';

class TopicService {
	#client;

	constructor() {
		this.#client = createClient('topic');
	}

	async createTopic(topic) {
		const newtopic = await this.#client.post('/', topic);

		return newtopic;
	}

	async getAllTopics(page = 0) {
		const topics = await this.#client.get('/', {
			params: {
				page,
			},
		});

		return topics;
	}

	async getTopicById(id) {
		const topic = await this.#client.get(`/${id}`);

		return topic;
	}

	async updateTopicById(id, topic) {
		const updatedtopic = await this.#client.put(`/${id}`, topic);

		return updatedtopic;
	}

	async deleteTopicById(id) {
		await this.#client.delete(`/${id}`);
	}
}

export default new TopicService();
