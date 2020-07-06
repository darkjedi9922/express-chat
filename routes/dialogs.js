const express = require('express');
const router = express.Router();
const { isLogged } = require('../rights/users');
const { requireAccess } = require('../rights/helpers');
const { validateWithFlashBack } = require('../tools/validation');
const { body } = require('express-validator');
const shortid = require('shortid');
const db = require('../db/connect');
const createHttpError = require('http-errors');
const { canPostMessage } = require('../rights/dialogs');

router.use(requireAccess(isLogged, '/'));

router.get('/', async (req, res) => {
    res.render('dialogs/index', {
        token: req.cookies.token,
        dialogs: await (await db()).dialogs.findByAuthor(req.cookies.token)
    })
});

router.get('/add', async (req, res) => {
    res.render('dialogs/add', {
        errors: req.errors,
        token: req.cookies.token,
        dialogs: await (await db()).dialogs.findByAuthor(req.cookies.token)
    })
});

router.post('/add', validateWithFlashBack([
    body('title', 'Название не указано').exists().notEmpty()
]), async (req, res) => {
    const newDialog = await (await db()).dialogs.insert({
        id: shortid.generate(),
        title: req.body.title,
        authorToken: req.cookies.token
    });
    res.redirect(`/dialogs/${newDialog.id}`);
});

router.get('/:id', async (req, res, next) => {
    const appDb = await db();
    const dialog = await appDb.dialogs.findOne(req.params.id).exec();
    if (!dialog) return next();
    res.render('dialogs/item', {
        token: req.cookies.token,
        dialogs: await appDb.dialogs.findByAuthor(req.cookies.token),
        currentDialog: dialog,
        messages: await Promise.all((await appDb.messages.findByDialog(dialog.id)).map(async (message) => ({
            item: message,
            author: await appDb.users.findOne(message.authorId).exec()
        }))),
        errors: req.errors
    })
});

router.post('/:id', async (req, res, next) => {
    const appDb = await db();
    const dialog = await appDb.dialogs.findOne(req.params.id).exec();
    if (!dialog) return next(createHttpError(404));
    next();
}, requireAccess(canPostMessage), validateWithFlashBack([
    body('text', 'Текст сообщения не указан').exists().notEmpty()
]), async (req, res) => {
    const appDb = await db();
    await appDb.messages.insert({
        dialogId: req.params.id,
        message: req.body.text,
        authorToken: req.cookies.token,
        createdAt: Date.now()
    });
    res.redirect('back');
})

module.exports = router;
