const AdminController = require('./controllers/admin.controller');
const express = require('express');
const router = express.Router();

router.post('/updateOrganization', AdminController.updateOrganization);

module.exports = router;