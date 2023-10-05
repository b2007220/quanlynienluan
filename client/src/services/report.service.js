import createClient from '../utils/client';

class ReportService {
	#client;

	constructor() {
		this.#client = createClient('report');
	}

	async createReport(report) {
		const newReport = await this.#client.post('/', report);

		return newReport;
	}

	async getAllReports() {
		const reports = await this.#client.get('/');

		return reports;
	}

	async getReportById(id) {
		const report = await this.#client.get(`/${id}`);

		return report;
	}

	async updateReportById(id, report) {
		const updatedReport = await this.#client.put(`/${id}`, report);

		return updatedReport;
	}

	async deleteReportById(id) {
		await this.#client.delete(`/${id}`);
	}

	async getReportsByEnroll(id) {
		const reports = await this.#client.get(`/enroll/${id}`);

		return reports;
	}
	
	async getFromStudent(){
		const reports = await this.#client.get('/student');
		return reports;
	}
}

export default new ReportService();
