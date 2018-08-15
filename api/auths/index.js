'use strict';

const express = require('express');
const controller = require('./auths.controller');
const router = express.Router();

router.post('/', controller.login);

module.exports = router;