const { validationResult } = require('express-validator');

module.exports.validateWithFlashBack = function(validations) {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        req.flash('errors', errors);
        res.redirect('back');
    };
};

module.exports.defineRequestErrors = (req, res, next) => {
    const errors = req.flash('errors') || [];
    req.errors = (errors.length ? errors[0].errors : []);
    next();
}