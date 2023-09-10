const userService = require('../services/user.service');

class UserController {
	/**
	 * @type {import("express").RequestHandler}
	 */
	async create(req, res, next) {
		try {
			res.status(201).json(await userService.create(req.body));
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
			res.status(200).json(await userService.getAll(req.query));
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
			const user = await userService.getById(req.params.id);

			if (!user) {
				res.status(404).json({ message: 'User not found' });
			}

			res.send(user);
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
			const user = await userService.getById(req.params.id);

			if (!user) {
				res.status(404).json({ message: 'User not found' });
			}

			res.send(await userService.update(req.params.id, req.body));
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
			const user = await userService.getById(req.params.id);

			if (!user) {
				res.status(404).json({ message: 'User not found' });
			}

			res.send(await userService.delete(req.params.id));
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new UserController();
