const { PrismaClient } = require('@prisma/client');

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

	async getAll(userId) {
		const reports = await this.#client.report.findMany({
			where: {
				enroll: {
					userId
				}
			},
			include: {
				enroll: true
			}
		});

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
}

module.exports = new ReportService();
