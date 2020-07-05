const connectDb = require('./connect');

exports.getCollection = async (name) => {
    const appDb = await connectDb();
    return appDb[name];
}