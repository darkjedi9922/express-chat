const { createRxDatabase, addRxPlugin } = require('rxdb');
const users = require('./schemas/users');
const dialogs = require('./schemas/dialogs');

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

    return appDb;
};