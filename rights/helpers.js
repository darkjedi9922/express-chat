const createHttpError = require("http-errors");

exports.requireAccess = (checkRightCallable, redirectUrl) => {
    return async (req, res, next) => {
        if (! await checkRightCallable(req)) {
            if (redirectUrl) res.redirect(redirectUrl);
            else next(createHttpError(403));
        } else next();
    }
}