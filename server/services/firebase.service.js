const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const admin = require('firebase-admin');

class FirebaseService {
	#app;
	#auth;
	constructor() {
		this.#app = initializeApp({
			credential: admin.credential.cert(require('../key.json')),
		});

		this.#auth = getAuth(this.#app);
	}

	async getUserByIdToken(token) {
		return this.#auth.verifyIdToken(token);
	}
}
module.exports = new FirebaseService();
