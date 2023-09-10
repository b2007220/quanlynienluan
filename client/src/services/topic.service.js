import createClient from '../utils/client';

class TopicService {
	#client;

	constructor() {
		this.#client = createClient('topics');
	}

	async createTopic(topic) {
		const newtopic = await this.#client.post('/', topic);

		return newtopic;
	}

	async getAllTopics() {
		const topics = await this.#client.get('/');

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
