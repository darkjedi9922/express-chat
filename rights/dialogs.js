const db = require("../db/connect")

exports.canPostMessage = async (req) => {
    const dialog = await (await db()).dialogs.findOne(req.params.id).exec();
    return dialog && dialog.members.includes(req.cookies.token);
}