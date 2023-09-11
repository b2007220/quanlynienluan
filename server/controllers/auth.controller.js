const authService = require('../services/auth.service');
const tokenService = require('../services/token.service');
const userService = require('../services/user.service');

class AuthController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async loginWithIdToken(req, res, next) {
		try {
			res.send(await authService.signInWithIdToken(req.body.token));
		} catch (error) {
			next(error);
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async login(req, res, next) {
		try {
			res.send(await authService.login(req.body));
		} catch (error) {
			next(error);
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async getProfile(req, res, next) {
		try {
			res.send(req.user);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new AuthController();
