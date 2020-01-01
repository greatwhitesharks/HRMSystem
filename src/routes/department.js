const departmentController = require('./controllers/department.controller');
const express = require('express');
const router = express.Router();

// Todo: authorization only for Admin or Hr Manager
router.post('/create', departmentController.create);
router.post('/delete', departmentController.delete);
module.exports = router;
