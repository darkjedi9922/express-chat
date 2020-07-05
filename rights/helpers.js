exports.requireAccess = (checkRightCallable, redirectUrl) => {
    return (req, res, next) => {
        if (!checkRightCallable(req)) {
            if (redirectUrl) res.redirect(redirectUrl);
            else res.sendStatus(403);
        } else next();
    }
}