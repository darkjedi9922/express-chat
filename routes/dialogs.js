const express = require('express');
const router = express.Router();
const { isLogged } = require('../rights/users');
const { requireAccess } = require('../rights/helpers');
const { validateWithFlashBack } = require('../tools/validation');
const { body } = require('express-validator');
const shortid = require('shortid');
const db = require('../db/connect');

router.use(requireAccess(isLogged, '/'));

router.get('/', async (req, res, next) => {
    res.render('dialogs/index', {
        token: req.cookies.token,
        dialogs: await (await db()).dialogs.findByAuthor(req.cookies.token)
    })
});

router.get('/add', async (req, res, next) => {
    res.render('dialogs/add', {
        errors: req.errors,
        token: req.cookies.token,
        dialogs: await (await db()).dialogs.findByAuthor(req.cookies.token)
    })
});

router.post('/add', validateWithFlashBack([
    body('title', 'Название не указано').exists().notEmpty()
]), async (req, res, next) => {
    const newDialog = await (await db()).dialogs.insert({
        id: shortid.generate(),
        title: req.body.title,
        authorToken: req.cookies.token
    });
    res.redirect(`/dialogs/${newDialog.id}`);
});

module.exports = router;
