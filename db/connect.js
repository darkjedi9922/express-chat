const { createRxDatabase, addRxPlugin } = require('rxdb');
const fs = require('fs');

addRxPlugin(require('pouchdb-adapter-node-websql'));

module.exports = async () => {
    const appDb = await createRxDatabase({
        name: './db/database/appdb',
        adapter: 'websql',
        multiInstance: false,
        eventReduce: false,
        ignoreDuplicate: true
    });

    await appDb.collection({
        name: 'users',
        schema: JSON.parse(fs.readFileSync(__dirname + '/schemas/user.json'))
    })

    return appDb;
};