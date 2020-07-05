const connectDb = require('./connect');
const util = require('util');

connectDb().then(appDb => {
    appDb.dump().then(json => console.log(util.inspect(json, true, 100, true)));
});