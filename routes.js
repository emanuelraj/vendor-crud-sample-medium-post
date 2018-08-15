/**
 * Main application routes
 */

'use strict';


module.exports = function(app) {
    app.use('/api/v1/auths', require('./api/auths'));
    app.use('/api/v1/vendors', require('./api/vendors'));
};