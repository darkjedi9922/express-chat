var express = require('express');
var router = express.Router();
var { body } = require('express-validator');
var { validateWithFlashBack } = require('../tools/validation');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', errors: req.errors });
});

router.post('/login', validateWithFlashBack([
    body('login', 'Логин не передан').exists().notEmpty(),
    body('password', 'Пароль не передан').exists().notEmpty(),
]), (req, res) => {
    // Do login...
    res.end();
});

module.exports = router;
