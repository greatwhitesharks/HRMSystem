const AccountController = require('./controllers/account.controller');
const AdminController=require('./controllers/admin.controller');
const express = require('express');
const router = express.Router();

router.post('/create', AccountController.create);
router.post('/assignRole',AdminController.assignRole);
router.post('/deleteAssignedRole',AdminController.deleteAssignedRole);
module.exports = router;
