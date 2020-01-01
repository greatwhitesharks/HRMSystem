const LeaveController = require('./controllers/leave.controller');
const express = require('express');
const router = express.Router();

router.post('/supervise', LeaveController.superviseLeave);
router.post('/getLeaveInfoAll',LeaveController.getLeaveInfoAll);
router.post('/getLeaveInfo',LeaveController.getLeaveInfo);
router.post('/applyLeave',LeaveController.applyLeave);
module.exports = router;
