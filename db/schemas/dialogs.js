const schema = {
    title: "Dialog schema",
    version: 3,
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
        members: {
            type: 'array',
            ref: 'users',
            items: {
                type: 'string'
            }
        },
        messages: {
            type: 'array',
            ref: 'messages',
            items: {
                type: 'string'
            }
        }
    },
    required: ["title", "members", "messages"]
}

module.exports = {
    name: 'dialogs',
    schema: schema,
    statics: {
        findByMember(authorToken) {
            return this.find().where('members').in([authorToken]).exec();
        }
    },
    migrationStrategies: {
        1: oldData => oldData,
        2: oldData => {
            oldData.messages = oldData.messages || [];
            return oldData;
        },
        3: oldData => {
            oldData.members = [oldData.authorToken];
            delete oldData.authorToken;
            return oldData;
        }
    }
}