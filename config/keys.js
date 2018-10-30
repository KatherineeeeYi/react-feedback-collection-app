if (process.env.NODE_ENV === 'production') {
    //in production - return the prod set pf keys
    module.exports = require('./prod');
} else {
    //in development - return the dev keys
    module.exports = require('./dev');
}