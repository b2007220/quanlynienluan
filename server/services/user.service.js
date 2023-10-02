const { PrismaClient, Role } = require('@prisma/client');
const passService = require('./pass.service');
const exclude = require('../utils/exclude');

class UserService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(user) {
		const newUser = await this.#client.user.create({
			data: user,
		});

		return newUser;
	}

	async getAll(page = 0, limit = 10) {
		const users = await this.#client.user.findMany({
			skip: page * limit,
			take: limit,
		});
		return {
			data: users,
			page,
			limit,
			total: Math.floor((await this.#client.user.count()) / limit + 0.9),
		};
	}

	async getById(id) {
		const user = await this.#client.user.findUnique({
			where: {
				id: parseInt(id),
			},
		});

		user.isSetPassword = !!user.password;
		return exclude(user, ['password']);
	}

	async getByEmail(email) {
		const user = await this.#client.user.findUnique({
			where: {
				email,
			},
		});

		return user;
	}

	async update(id, user) {
		const updatedUser = await this.#client.user.update({
			where: {
				id: parseInt(id),
			},
			data: user,
		});

		return updatedUser;
	}

	async delete(id) {
		const deletedUser = await this.#client.user.delete({
			where: {
				id: parseInt(id),
			},
		});

		return deletedUser;
	}

	async activeUser(id) {
		const updatedUser = await this.#client.user.update({
			where: {
				id: parseInt(id),
			},
			data: {
				active: true,
			},
		});

		return updatedUser;
	}

	async unactiveUser(id) {
		const updatedUser = await this.#client.user.update({
			where: {
				id: parseInt(id),
			},
			data: {
				active: false,
			},
		});
		return updatedUser;
	}

	async changeTeacher(id) {
		const updatedUser = await this.#client.user.update({
			where: {
				id: parseInt(id),
			},
			data: {
				role: 'TEACHER',
			},
		});
		return updatedUser;
	}

	async changeStudent(id) {
		const updatedUser = await this.#client.user.update({
			where: {
				id: parseInt(id),
			},
			data: {
				role: 'STUDENT',
			},
		});
		return updatedUser;
	}

	async changePassword(id, password) {
		const updatedUser = await this.#client.user.update({
			where: {
				id: parseInt(id),
			},
			data: {
				password: await passService.hash(password),
			},
		});
		return updatedUser;
	}

	async getPassword(id) {
		const user = await this.#client.user.findUnique({
			where: {
				id: parseInt(id),
			},
		});
		return user.password;
	}

	async getAllTeachers() {
		const users = await this.#client.user.findMany({
			where: {
				role: Role.TEACHER,
			},
		});
		return users;
	}
}

module.exports = new UserService();
