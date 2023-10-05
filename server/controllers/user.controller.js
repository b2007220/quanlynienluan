const userService = require('../services/user.service');
const passService = require('../services/pass.service');

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
			const { page, limit } = req.query;
			res.status(200).json(await userService.getAll(page, limit));
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
	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async activeUser(req, res, next) {
		try {
			const user = await userService.getById(req.params.id);

			if (!user) {
				res.status(404).json({ message: 'User not found' });
			}

			res.send(await userService.activeUser(req.params.id));
		} catch (error) {
			next(error);
		}
	}
	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async unactiveUser(req, res, next) {
		try {
			const user = await userService.getById(req.params.id);

			if (!user) {
				res.status(404).json({ message: 'User not found' });
			}

			res.send(await userService.unactiveUser(req.params.id));
		} catch (error) {
			next(error);
		}
	}
	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async changeTeacher(req, res, next) {
		try {
			const user = await userService.getById(req.params.id);

			if (!user) {
				res.status(404).json({ message: 'User not found' });
			}

			res.send(await userService.changeTeacher(req.params.id));
		} catch (error) {
			next(error);
		}
	}

	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async changeStudent(req, res, next) {
		try {
			const user = await userService.getById(req.params.id);

			if (!user) {
				res.status(404).json({ message: 'User not found' });
			}

			res.send(await userService.changeStudent(req.params.id));
		} catch (error) {
			next(error);
		}
	}
	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async changePassword(req, res, next) {
		try {
			const password = await userService.getPassword(req.user.id);

			if (!(await passService.verify(req.body.oldPassword, password))) {
				return res.status(400).json({ message: 'Wrong password' });
			}

			res.send(await userService.changePassword(req.user.id, req.body.newPassword));
		} catch (error) {
			next(error);
		}
	}
	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async createPassword(req, res, next) {
		try {
			res.send(await userService.changePassword(req.user.id, req.body.password));
		} catch (error) {
			next(error);
		}
	}
	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async getAllTeachers(req, res, next) {
		try {
			res.status(200).json(await userService.getAllTeachers());
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new UserController();
