'use strict';

const express = require('express');
const controller = require('./vendors.controller');
const router = express.Router();
const VerifyToken = require('../auths/verifyToken');

router.get('/', VerifyToken, controller.index);
router.get('/:id', VerifyToken, controller.retrieve);
router.post('/', VerifyToken, controller.create);
router.put('/:id', VerifyToken, controller.update);
router.delete('/:id', VerifyToken, controller.delete);

module.exports = router;