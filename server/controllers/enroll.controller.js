const enrollService = require('../services/enroll.service');

class EnrollController {
	/**
	 * @type {import("express").RequestHandler}
	 */
	async create(req, res, next) {
		try {
			res.status(201).json(await enrollService.create(req.body));
		} catch (error) {
			next(error);
		}
	}
	/**
	 * @type {import("express").RequestHandler}
	 */
	async createEnrollFromUse(req, res, next) {
		try {
			if ((await enrollService.haveEnroll(req.user.id)) == true) {
				res.status(400).json({ message: 'User already have an enroll' });
			} else {
				res.status(201).json(await enrollService.createEnrollFromUse(req.body, req.user));
			}
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
			res.status(200).json(await enrollService.getAll());
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
			const enroll = await enrollService.getById(req.params.id);

			if (!enroll) {
				res.status(404).json({ message: 'Enroll not found' });
			}

			res.send(enroll);
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
			const enroll = await enrollService.getById(req.params.id);

			if (!enroll) {
				res.status(404).json({ message: 'Enroll not found' });
			}

			res.send(await enrollService.update(req.params.id, req.body));
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
			const enroll = await enrollService.getById(req.params.id);

			if (!enroll) {
				res.status(404).json({ message: 'Enroll not found' });
			}

			res.send(await enrollService.delete(req.params.id));
		} catch (error) {
			next(error);
		}
	}

	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async getByStudentIdInSemester(req, res, next) {
		try {
			const enroll = await enrollService.getByStudentIdInSemester(req.params.userId, req.params.semesterId);

			if (!enroll) {
				res.status(404).json({ message: 'Enroll not found' });
			}

			res.send(enroll);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async getByTeacherId(req, res, next) {
		try {
			const { page, limit } = req.query;
			const enrolls = await enrollService.getByTeacherId(req.params.teacherId, page, limit);

			if (!enrolls) {
				res.status(404).json({ message: 'Enroll not found' });
			}

			res.send(enrolls);
		} catch (error) {
			next(error);
		}
	}
	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async getFromStudent(req, res, next) {
		try {
			const enroll = await enrollService.getFromStudent(req.user.id);
			if (!enroll) {
				res.status(404).json({ message: 'Enroll not found' });
			}
			res.send(enroll);
		} catch (error) {
			next(error);
		}
	}
	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async getByTeacherMasterId(req, res, next) {
		try {
			const enrolls = await enrollService.getByTeacherMasterId(req.params.teacherId);

			if (!enrolls) {
				res.status(404).json({ message: 'Enroll not found' });
			}

			res.send(enrolls);
		} catch (error) {
			next(error);
		}
	}
	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async getByTeacherBasisId(req, res, next) {
		try {
			const enrolls = await enrollService.getByTeacherBasisId(req.params.teacherId);

			if (!enrolls) {
				res.status(404).json({ message: 'Enroll not found' });
			}

			res.send(enrolls);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new EnrollController();
