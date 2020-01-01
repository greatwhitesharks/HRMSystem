const AdminController = require('./controllers/admin.controller');
const express = require('express');
const router = express.Router();

router.post('/addpaygrade', AdminController.addPayGrade);
router.post('/removepaygrade',AdminController.removePayGrade);
router.post('/changeleavelimit', AdminController.changeLeaveLimit);

module.exports = router;
