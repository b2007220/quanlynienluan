const yearService = require('../services/year.service');

class YearController {
	/**
	 * @type {import("express").RequestHandler}
	 */
	async create(req, res, next) {
		try {
			res.status(201).json(await yearService.create(req.body));
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
			res.status(200).json(await yearService.getAll(req.query));
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
			const year = await yearService.getById(req.params.id);

			if (!year) {
				res.status(404).json({ message: 'year not found' });
			}

			res.send(year);
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
			const year = await yearService.getById(req.params.id);

			if (!year) {
				res.status(404).json({ message: 'year not found' });
			}

			res.send(await yearService.update(req.params.id, req.body));
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
			const year = await yearService.getById(req.params.id);

			if (!year) {
				res.status(404).json({ message: 'year not found' });
			}

			res.send(await yearService.delete(req.params.id));
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new YearController();
