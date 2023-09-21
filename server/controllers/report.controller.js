const reportService = require('../services/report.service');

class ReportController {
	/**
	 * @type {import("express").RequestHandler}
	 */
	async create(req, res, next) {
		try {
			res.status(201).json(await reportService.create(req.body));
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
			res.status(200).json(await reportService.getAll());
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
			const report = await reportService.getById(req.params.id);

			if (!report) {
				res.status(404).json({ message: 'Report not found' });
			}

			res.send(report);
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
			const report = await reportService.getById(req.params.id);

			if (!report) {
				res.status(404).json({ message: 'Report not found' });
			}

			res.send(await reportService.update(req.params.id, req.body));
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
			const report = await reportService.getById(req.params.id);

			if (!report) {
				res.status(404).json({ message: 'Report not found' });
			}

			res.send(await reportService.delete(req.params.id));
		} catch (error) {
			next(error);
		}
	}
	/**
	 * @type {import("express").RequestHandler}
	 *
	 */
	async getReportByEnrollId(req, res, next) {
		try {
			const reports = await reportService.getReportByEnrollId(req.params.id);

			if (!reports) {
				res.status(404).json({ message: 'Report not found' });
			}

			res.send(reports);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new ReportController();
