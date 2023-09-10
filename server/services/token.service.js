const jwt = require('jsonwebtoken');

class TokenService {
	#secretKey = process.env.JWT_SECRET_KEY || 'secret';

	constructor() {}

	sign(payload) {
		return jwt.sign(payload, this.#secretKey);
	}

	decode(token) {
		return jwt.verify(token, this.#secretKey);
	}
}

module.exports = new TokenService();
