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
			res.status(200).json(await userService.getAll());
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

	async changePassword(req, res, next) {
		try {
			const user = await userService.getPassword(req.params.id);
			if (!user) {
				res.status(404).json({ message: 'User not found' });
			}

			if (!passService.verify(req.body.oldpassword, user.password)) {
				res.status(400).json({ message: 'Wrong password' });
			}

			res.send(await userService.changePassword(req.params.id, req.body.newpassword));
		} catch (error) {
			next(error);
		}
	}

	async createPassword(req, res, next) {
		try {
			const user = await userService.getPassword(req.params.id);
			if (user.password) {
				res.status(400).json({ message: 'Already have password' });
			}
			res.send(await userService.changePassword(req.params.id, req.body.password));
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new UserController();
