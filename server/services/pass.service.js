const bcrypt = require('bcrypt');

const saltRounds = 10;

class PassService {
	hash(password) {
		return bcrypt.hash(password, saltRounds);
	}

	verify(password, hash) {
		return bcrypt.compare(password, hash);
	}
}

module.exports = new PassService();
