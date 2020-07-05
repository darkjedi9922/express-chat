const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validateWithFlashBack } = require('../tools/validation');
const { hash } = require('rxdb');
const { getCollection } = require('../db/helpers');

router.get('/', async (req, res) => {
    if (req.cookies.token) {
        const userMe = await (await getCollection('users')).findOne()
            .where('token').eq(req.cookies.token).exec();
        if (userMe) res.redirect('/dialogs');
    }
    res.render('index', { title: 'Express', errors: req.errors });
});

router.post('/login', validateWithFlashBack([
    body('login', 'Логин не передан').exists().notEmpty(),
    body('password', 'Пароль не передан').exists().notEmpty(),
]), async (req, res) => {
    const userToken = hash(`${req.body.login}${req.body.password}`);
    (await getCollection('users')).insert({
        token: userToken,
        login: req.body.login
    });

    res.cookie('token', userToken).redirect('/dialogs');
});

router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/');
})

module.exports = router;
