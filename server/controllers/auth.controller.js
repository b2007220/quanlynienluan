const tokenService = require('../services/token.service');
const userService = require('../services/user.service');
const passport = require('passport');

class AuthController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async login(req, res, next) {
		try {
			const { email, password } = req.body;

			const existingUser = await userService.getByEmail(email);

			if (!existingUser) {
				res.status(401).end();
			}

			if (existingUser.password !== password) {
				res.status(401).end();
			}

			if(existingUser.active == 0){
				res.status(401).end();
			}

			const token = tokenService.sign({ id: existingUser.id, role: existingUser.id });

			res.json({ token });
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
