const connectDb = require('./connect');

exports.getCollection = async (name) => {
    const appDb = await connectDb();
    return appDb[name];
}

exports.getUserMe = async (token) => {
    return await (await this.getCollection('users')).findOne().where('token').eq(token).exec();
}