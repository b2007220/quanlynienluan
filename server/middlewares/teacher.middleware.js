const tokenService = require('../services/token.service');

module.exports = async function (req, res, next) {
	try {
		const token = req.headers.authorization?.replace('Bearer ', '');

		if (!token) {
			return res.status(401).end();
		}

		const { role } = tokenService.decode(token);

		if(role == 2 || role == 3){
            next();
        }
		else{
            return res.status(401).end();
        }
	} catch (error) {
		next(error);
	}
};