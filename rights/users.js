const db = require("../db/connect");

exports.isLogged = async (req) => req.cookies.token && (await db()).users.findByToken(req.cookies.token);
exports.isGuest = async (req) => ! await this.isLogged(req);