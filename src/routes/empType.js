const EmpTypeController = require('./controllers/empType.controller');
const express = require('express');
const router = express.Router();

router.post('/add', EmpTypeController.create);
router.post('/remove', EmpTypeController.delete);

module.exports = router;