const schema = {
    title: "Dialog schema",
    version: 5,
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
        },
        createdAt: {
            type: 'integer'
        }
    },
    required: ["title", "members", "messages", "createdAt"],
    indexes: ['createdAt']
}

module.exports = {
    name: 'dialogs',
    schema: schema,
    statics: {
        findByMember(authorToken) {
            return this.find().where('members').in([authorToken]).sort({ createdAt: 1 }).exec();
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
        },
        4: oldData => {
            oldData.createdAt = Date.now();
            return oldData;
        },
        5: oldData => oldData
    }
}