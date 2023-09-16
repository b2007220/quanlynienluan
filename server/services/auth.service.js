const firebaseService = require('./firebase.service');
const prisma = require('../prisma');
const tokenService = require('./token.service');
const passService = require('./pass.service');

class AuthService {
	#prisma;
	#token;
	constructor() {
		this.#token = tokenService;
		this.#prisma = prisma;
	}
	async login({ email, password }) {
		const existingUser = await this.#prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (!existingUser) {
			throw new Error('None exist');
		}
		if (!(await passService.verify(password, existingUser.password))) {
			throw new Error('Password incorrect');
		}
		return {
			token: this.#token.sign({
				id: existingUser.id,
			}),
		};
	}

	async signInWithIdToken(token) {
		const user = await firebaseService.getUserByIdToken(token);

		let existingUser = await this.#prisma.user.findUnique({
			where: {
				uid: user.uid,
			},
		});

		if (!existingUser) {
			existingUser = await this.#prisma.user.create({
				data: {
					fullName: user.name,
					email: user.email,
					uid: user.uid,
				},
			});
		}

		return {
			token: this.#token.sign({
				id: existingUser.id,
			}),
		};
	}
}

module.exports = new AuthService();
