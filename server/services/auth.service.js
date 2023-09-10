const { JsonWebTokenError } = require("jsonwebtoken");

class AuthService {
    checkLogin(){
        var token = req.cookie.token;
        var idUser = jwt.verify()
    }
}

module.exports = new AuthService();
