const AdminController = require('./controllers/admin.controller');
const express = require('express');
const router = express.Router();

router.post('/addjob', AdminController.addJobTitle);
router.post('/removejob',AdminController.removeJobTitle);
router.post('/addpaygrade', AdminController.addPayGrade);
router.post('/removepaygrade',AdminController.removePayGrade);

module.exports = router;