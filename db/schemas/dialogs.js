const schema = {
    title: "Dialog schema",
    version: 2,
    description: "Describes a dialog schema",
    type: "object",
    properties: {
        id: {
            type: "string",
            primary: true
        },
        title: {
            type: "string"
        },
        authorToken: {
            type: "string"
        },
        messages: {
            type: 'array',
            ref: 'messages',
            items: {
                type: 'string'
            }
        }
    },
    required: ["title", "authorToken", "messages"],
    indexes: ["authorToken"]
}

module.exports = {
    name: 'dialogs',
    schema: schema,
    statics: {
        findByAuthor(authorToken) {
            return this.find().where('authorToken').eq(authorToken).exec()
        }
    },
    migrationStrategies: {
        1: oldData => oldData,
        2: oldData => {
            oldData.messages = oldData.messages || [];
            return oldData;
        }
    }
}