exports.requireAccess = (checkRightCallable, redirectUrl) => {
    return async (req, res, next) => {
        if (! await checkRightCallable(req)) {
            if (redirectUrl) res.redirect(redirectUrl);
            else res.sendStatus(403);
        } else next();
    }
}