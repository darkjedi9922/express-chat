const { removeRxDatabase, addRxPlugin } = require('rxdb');

addRxPlugin(require('pouchdb-adapter-node-websql'));
removeRxDatabase('./db/database/appdb', 'websql');