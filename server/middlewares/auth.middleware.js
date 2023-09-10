const tokenService = require('../services/token.service');
const userService = require('../services/user.service');

module.exports = async function (req, res, next) {
	try {
		const token = req.headers.authorization?.replace('Bearer ', '');

		if (!token) {
			return res.status(401).end();
		}

		const { id } = tokenService.decode(token);

		const existingUser = await userService.getById(id);

		if (!existingUser) {
			return res.status(401).end();
		}

		req.user = existingUser;

		next();
	} catch (error) {
		next(error);
	}
};
