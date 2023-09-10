class TokenService {
	setToken(token) {
		localStorage.setItem('token', token);
	}
	getToken() {
		return localStorage.getItem('token');
	}
	deleteToken() {
		localStorage.removeItem('token');
	}
}
export default new TokenService();
