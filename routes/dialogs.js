const express = require('express');
const router = express.Router();
const { isLogged } = require('../rights/users');
const { requireAccess } = require('../rights/helpers');

router.use(requireAccess(isLogged, '/'));

router.get('/', (req, res, next) => {
    res.render('dialogs/index', { token: req.cookies.token })
});

router.get('/add', function(req, res, next) {
    res.render('dialogs/add')
});

module.exports = router;
