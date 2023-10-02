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
			const enrolls = await enrollService.getByTeacherId(req.params.teacherId);

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
