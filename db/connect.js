const { createRxDatabase, addRxPlugin } = require('rxdb');
const fs = require('fs');
const { basename } = require('path');

addRxPlugin(require('pouchdb-adapter-node-websql'));

module.exports = async () => {
    const appDb = await createRxDatabase({
        name: './db/database/appdb',
        adapter: 'websql',
        multiInstance: false,
        eventReduce: false,
        ignoreDuplicate: true
    });

    await loadSchemas(appDb);

    return appDb;
};

async function loadSchemas(appDb) {
    const schemaDir = __dirname + '/schemas';
    return Promise.all(fs.readdirSync(schemaDir).map(async (schemaFile) => {
        await appDb.collection({
            name: basename(schemaFile, '.json'),
            schema: JSON.parse(fs.readFileSync(schemaDir + '/' + schemaFile))
        })
    }))
}