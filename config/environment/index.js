'use strict';

const path = require('path');
const _ = require('lodash');
const local = require('../local.env.js');

if (!process.env.VENDOR_NODE_ENV) {
    console.log("Environment Not Set. Please set VENDOR_NODE_ENV to development | test");
    requiredProcessEnv(VENDOR_NODE_ENV);
    process.exit(2);
}

function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

// All configurations will extend these options
// ============================================
let config = {
    env: process.env.VENDOR_NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 8000,

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    // Should we populate the DB with sample data?
    seedDB: false,

    mongo: {
        options: {
            useNewUrlParser: true
        }
    },

    selfDomain: "erpfs.com",
    
};

// Export the config object based on the VENDOR_NODE_ENV
// ==============================================
module.exports = _.merge(
    config,
    require('./' + process.env.VENDOR_NODE_ENV + '.js') || {},
    require('../local.env.js'));