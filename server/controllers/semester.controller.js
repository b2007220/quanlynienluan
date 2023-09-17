const semesterService = require('../services/semester.service');

class SemesterController {
	/**
	 * @type {import("express").RequestHandler}
	 */
	async create(req, res, next) {
		try {
			res.status(201).json(await semesterService.create(req.body));
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
			res.status(200).json(await semesterService.getAll());
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
			const semester = await semesterService.getById(req.params.id);

			if (!semester) {
				res.status(404).json({ message: 'Semester not found' });
			}

			res.send(semester);
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
			const semester = await semesterService.getById(req.params.id);

			if (!semester) {
				res.status(404).json({ message: 'Semester not found' });
			}

			res.send(await semesterService.update(req.params.id, req.body));
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
			const semester = await semesterService.getById(req.params.id);

			if (!semester) {
				res.status(404).json({ message: 'Semester not found' });
			}

			res.send(await semesterService.delete(req.params.id));
		} catch (error) {
			next(error);
		}
	}

	async getSemestersByYearId(req, res, next) {
		try {
			const semesters = await semesterService.getSemestersByYearId(req.params.year);

			if (!semesters) {
				res.status(404).json({ message: 'Semesters not found' });
			}
		} catch (error) {
			next(error);
		}
	}

	async getSemestersByYearIdAndTeacherId(req, res, next) {
		try {
			const semesters = await semesterService.getSemestersByYearIdAndTeacherId(
				req.params.semesterId,
				req.params.teacher,
			);

			if (!semesters) {
				res.status(404).json({ message: 'Semesters not found' });
			}
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new SemesterController();
