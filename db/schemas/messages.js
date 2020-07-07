const shortid = require("shortid");

const schema = {
    title: "Dialog message schema",
    version: 0,
    description: "Describes a dialog message schema",
    type: "object",
    properties: {
        id: {
            type: "string",
            primary: true
        },
        dialogId: {
            type: "string"
        },
        message: {
            type: "string"
        },
        authorToken: {
            type: "string"
        },
        createdAt: {
            type: "integer"
        }
    },
    required: ["dialogId", "message", "authorToken", "createdAt"],
    indexes: ["dialogId"]
}

module.exports = {
    name: 'messages',
    schema: schema,
    statics: {
        findByDialog(dialogId) {
            return this.find().where('dialogId').eq(dialogId).exec();
        }
    }
}