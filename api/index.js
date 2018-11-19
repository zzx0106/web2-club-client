require('babel-core/register');
const router = require('./router');

module.exports = {
    // path: '/api',
    handler: router,
};
