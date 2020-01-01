const RoleAndPermissionController = require('./controllers/roleAndPermission.controller');
const express = require('express');
const router = express.Router();

router.post('/create', RoleAndPermissionController.create);
router.post('/getPermissions',RoleAndPermissionController.getPermissions);

module.exports = router;
