const bcrypt = require('bcrypt');

class PassService {
	#saltRounds = 10;

	hash(password) {
		return bcrypt.hash(password, this.#saltRounds);
	}

	verify(password, hash) {
		return bcrypt.compare(password, hash);
	}
}
module.exports = new PassService();
