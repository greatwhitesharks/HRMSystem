const AdminController = require('./controllers/admin.controller');
const express = require('express');
const router = express.Router();

router.post('/addjob', AdminController.addJobTitle);
router.post('/removejob',AdminController.removeJobTitle);

module.exports = router;
