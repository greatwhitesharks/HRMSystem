const branchController = require('./controllers/branch.controller');
const express = require('express');
const router = express.Router();

// Todo: Authorization only for Admin
router.post('/create', branchController.create);
router.post('/delete', branchController.delete);
module.exports = router;
