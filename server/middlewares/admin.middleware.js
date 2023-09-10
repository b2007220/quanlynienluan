const { Role } = require('@prisma/client');

module.exports = async function (req, res, next) {
	try {
		const { role } = req.user;

		if (role == Role.ADMIN) {
			next();
		} else {
			return res.status(403).end();
		}
	} catch (error) {
		next(error);
	}
};
