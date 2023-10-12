const { PrismaClient } = require('@prisma/client');
const semesterService = require('./semester.service');
const enrollService = require('./enroll.service');
class ReportService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(report) {
		const newReport = await this.#client.report.create({
			data: report,
		});

		return newReport;
	}

	async getAll() {
		const reports = await this.#client.report.findMany();

		return reports;
	}

	async getById(id) {
		const report = await this.#client.report.findUnique({
			where: {
				id: parseInt(id),
			},
		});

		return report;
	}

	async update(id, report) {
		const updatedReport = await this.#client.report.update({
			where: {
				id: parseInt(id),
			},
			data: report,
		});

		return updatedReport;
	}

	async delete(id) {
		const deletedReport = await this.#client.report.delete({
			where: {
				id: parseInt(id),
			},
		});

		return deletedReport;
	}

	async getReportsByEnroll(id) {
		const reports = await this.#client.report.findMany({
			where: {
				enrollId: parseInt(id),
			},
			include: {
				enroll: true,
			},
		});

		return reports;
	}

	async getReportByEnrollId(id, page = 0, limit = 10) {
		const reports = await this.#client.report.findMany({
			where: {
				enrollId: parseInt(id),
			},
			skip: page * limit,
			take: limit,
		});

		return {
			data: reports,
			page,
			limit,
			total: Math.floor(
				(await this.#client.report.count({
					where: {
						enrollId: parseInt(id),
					},
				})) /
					limit +
					0.9,
			),
		};
	}

	async getFromStudent(id) {
		const enroll = await enrollService.getFromStudent(id);
		const reports = await this.#client.report.findMany({
			where: {
				enrollId: enroll.id,
			},
			include: {
				enroll: true,
			},
		});

		return reports;
	}
}

module.exports = new ReportService();
