const { getUserMe } = require("../db/helpers");

exports.isLogged = (req) => req.cookies.token && getUserMe(req.cookies.token);
exports.isGuest = (req) => !this.isLogged(req);