const gradeService = require('../services/grade.service');

class GradeController {
	/**
	 * @type {import("express").RequestHandler}
	 */
	async create(req, res, next) {
		try {
			res.status(201).json(await gradeService.create(req.body));
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
			res.status(200).json(await gradeService.getAll());
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
			const grade = await gradeService.getById(req.params.id);

			if (!grade) {
				res.status(404).json({ message: 'grade not found' });
			}

			res.send(grade);
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
			const grade = await gradeService.getById(req.params.id);

			if (!grade) {
				res.status(404).json({ message: 'grade not found' });
			}

			res.send(await gradeService.update(req.params.id, req.body));
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
			const grade = await gradeService.getById(req.params.id);

			if (!grade) {
				res.status(404).json({ message: 'grade not found' });
			}

			res.send(await gradeService.delete(req.params.id));
		} catch (error) {
			next(error);
		}
	}

	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async getGradesFromUser(req, res, next) {
		try {
			res.status(200).json(await gradeService.getGradesFromUser(req.query));
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new GradeController();
