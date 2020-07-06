const schema = {
    title: "User schema",
    version: 0,
    description: "Connects user's hash token to its integer id",
    type: "object",
    properties: {
        token: {
            type: "string",
            primary: true
        },
        login: {
            type: "string"
        }
    },
    required: ["login"]
}

module.exports = {
    name: 'users',
    schema: schema,
    statics: {
        findByToken(token) {
            return this.findOne().where('token').eq(token).exec();
        }
    }
}