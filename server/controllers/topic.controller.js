const topicService = require('../services/topic.service');

class TopicController {
	/**
	 * @type {import("express").RequestHandler}
	 */
	async create(req, res, next) {
		try {
			res.status(201).json(await topicService.create(req.body));
		} catch (error) {
			next(error);
		}
	}

	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async getAll(req, res, next) {
		try {
			res.status(200).json(await topicService.getAll(req.query));
		} catch (error) {
			next(error);
		}
	}

	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async getById(req, res, next) {
		try {
			const topic = await topicService.getById(req.params.id);

			if (!topic) {
				res.status(404).json({ message: 'Topic not found' });
			}

			res.send(topic);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async updateById(req, res, next) {
		try {
			const topic = await topicService.getById(req.params.id);

			if (!topic) {
				res.status(404).json({ message: 'Topic not found' });
			}

			res.send(await topicService.update(req.params.id, req.body));
		} catch (error) {
			next(error);
		}
	}

	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async deleteById(req, res, next) {
		try {
			const topic = await topicService.getById(req.params.id);

			if (!topic) {
				res.status(404).json({ message: 'Topic not found' });
			}

			res.send(await topicService.delete(req.params.id));
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new TopicController();
