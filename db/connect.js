const { createRxDatabase, addRxPlugin } = require('rxdb');
const users = require('./schemas/users');
const dialogs = require('./schemas/dialogs');
const messages = require('./schemas/messages');

addRxPlugin(require('pouchdb-adapter-node-websql'));

module.exports = async () => {
    const appDb = await createRxDatabase({
        name: './db/database/appdb',
        adapter: 'websql',
        multiInstance: false,
        eventReduce: false,
        ignoreDuplicate: true
    });

    await appDb.collection(users);
    await appDb.collection(dialogs);
    await appDb.collection(messages);

    return appDb;
};