const useService = require('../services/use.service');

class UseController {
	/**
	 * @type {import("express").RequestHandler}
	 */
	async create(req, res, next) {
		try {
			res.status(201).json(await useService.create(req.body));
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
			res.status(200).json(await useService.getAll());
		} catch (error) {
			next(error);
		}
	}
	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async getAllFromUser(req, res, next) {
		try {
			res.status(200).json(await useService.getAllFromUser(req.query));
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
			const use = await useService.getById(req.params.id);

			if (!use) {
				res.status(404).json({ message: 'use not found' });
			}

			res.send(use);
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
			const use = await useService.getById(req.params.id);

			if (!use) {
				res.status(404).json({ message: 'use not found' });
			}

			res.send(await useService.update(req.params.id, req.body));
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
			const use = await useService.getById(req.params.id);

			if (!use) {
				res.status(404).json({ message: 'use not found' });
			}

			res.send(await useService.delete(req.params.id));
		} catch (error) {
			next(error);
		}
	}

	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async getAllInSemester(req, res, next) {
		try {
			res.status(200).json(await useService.getAllInSemester());
		} catch (error) {
			next(error);
		}
	}
	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async getUsesFromTeacher(req, res, next) {
		try {
			
			res.status(200).json(await useService.getUsesFromTeacher( req.query.page, req.query.limit,req.query.type, req.query.teacherId,));
		} catch (error) {
			next(error);
		}
	}
	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async getUsesFromIncharge(req, res, next) {
		try {
			res.status(200).json(await useService.getUsesFromIncharge(req.query.page, req.query.limit, req.user));
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new UseController();
