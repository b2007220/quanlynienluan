const majorService = require('../services/major.service');

class MajorController {
	/**
	 * @type {import("express").RequestHandler}
	 */
	async create(req, res, next) {
		try {
			res.status(201).json(await majorService.create(req.body));
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
			res.status(200).json(await majorService.getAll(req.query));
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
			const major = await majorService.getById(req.params.id);

			if (!major) {
				res.status(404).json({ message: 'Major not found' });
			}

			res.send(major);
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
			const major = await majorService.getById(req.params.id);

			if (!major) {
				res.status(404).json({ message: 'Major not found' });
			}

			res.send(await majorService.update(req.params.id, req.body));
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
			const major = await majorService.getById(req.params.id);

			if (!major) {
				res.status(404).json({ message: 'Major not found' });
			}

			res.send(await majorService.delete(req.params.id));
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new MajorController();
