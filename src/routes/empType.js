const EmpTypeController = require('./controllers/.empType.controller');
const express = require('express');
const router = express.Router();

router.post('/create', EmpTypeController.create);

module.exports = router;