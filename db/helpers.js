const connectDb = require('./connect');
const { getCollection } = require("../db/helpers");

exports.getCollection = async (name) => {
    const appDb = await connectDb();
    return appDb[name];
}

exports.getUserMe = async (token) => {
    return await (await getCollection('users')).findOne().where('token').eq(token).exec();
}