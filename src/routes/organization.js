const AdminController = require('./controllers/admin.controller');
const express = require('express');
const router = express.Router();

router.post('/updateOrganization', AdminController.updateOrganization);
router.post('/viewOrganization', AdminController.viewOrganization);

module.exports = router;