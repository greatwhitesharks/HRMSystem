const EmpTypeController = require('./controllers/empType.controller');
const express = require('express');
const router = express.Router();

router.post('/addEmpType', EmpTypeController.create);
router.post('/removeEmpType', EmpTypeController.delete);

module.exports = router;