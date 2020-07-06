const schema = {
    title: "Dialog schema",
    version: 0,
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
        }
    },
    required: ["title", "authorToken"],
    indexes: ["authorToken"]
}

module.exports = {
    name: 'dialogs',
    schema: schema,
    statics: {
        findByAuthor(authorToken) {
            return this.find().where('authorToken').eq(authorToken).exec()
        }
    }
}