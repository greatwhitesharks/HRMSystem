const express = require('express');
const router = express.Router();
const db = require('../../db');
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');
const CustomAttributeService =
  require('../../services/customAttribute.service');
  const LeaveService =
  require('../../services/absence.service');
const reportController = require('../controllers/report.controller');
router.get('/',
    ensureLoggedIn('/login')
    ,
    (req, res) => {
      res.render('dashboard', {layout: 'layouts/main', title: 'Dashboard'});
    });

router.get('/add-employee',
    ensureLoggedIn(),
    (req, res) => {
      const service = new CustomAttributeService(db);
      const attributes = service.getAttributes(['*']);

      res.render('records/add', {
        layout: 'layouts/main',
        title: 'Create Employee Record',
        attributes,
        // departments,
        // jobTitles,
        // paygrades,
        // empTypes
      });
    });

router.get('/login',
    ensureLoggedOut('/')
    , (req, res) => {
      res.render('login', {
        layout: 'layouts/guest',

      });
    });


router.get('/branch/add', (req, res) => {
  res.render('branch/single', {
    layout: 'layouts/main',
    title: 'Add Branch',
    branch: {},
  });
});

router.get('/leave/viewAll', async (req, res) => {
  const  leaveService= new LeaveService(db);
  var supervisorId=1;//for test purpses
  var leaveInfoAll=await leaveService.getLeaveInfoAll(supervisorId);
  res.render('leave/all', {
    layout: 'layouts/main',
    title: 'Leave Manger',
    leaveInfoAll,
  });
});
  router.get('/leave/add', async (req, res) => {
    const leaveService= new LeaveService(db);
    var employeeId=1;//for test purpses
    var leaveInfo=await leaveService.getLeaveInfo(employeeId);
    res.render('leave/single', {
      layout: 'layouts/main',
      title: 'Leave Details And Form',
      leaveInfo
    }); 
});

router.post('/leave/apply', async (req, res) => {
  const leaveService= new LeaveService(db);
  var id=1;//for test purpses
  const {
    type,
    from,
    to,
    comment}=req.body;
    var stmt=await leaveService.applyLeave(id,type,from,to,comment);
    console.log(stmt);
    
}); 

router.get('/leave/approve/:id', async(req, res) => {
  var supervisorId=1;
  const  leaveService= new LeaveService(db);
  const leave = await leaveService.getById(req.params.id);
  await leaveService.approveLeave(leave, supervisorId);
  res.redirect("/leave/viewAll");
});
router.get('/leave/decline/:id', async(req, res) => {
  var supervisorId=1;
  const  leaveService= new LeaveService(db);
  const leave = await leaveService.getById(req.params.id);
  await leaveService.declineLeave(leave, supervisorId);
  res.redirect("/leave/viewAll");
});
router.get('/department/add', (req, res) => {
  res.render('department/single', {
    layout: 'layouts/main',
    title: 'Add Department',
    department:{},
  });
});
/**
 * Employee By Properies (Department Name, PayGrade, JobTitle, Employment Type, Custom Attributes)
 * Leaves by  Properties
 *
 */
router.get('/job/add', (req, res) => {
  res.render('job/add', {
    layout: 'layouts/main',
    title: 'Add Job',
    job:{},
  });
});

router.get('/paygrade/add', (req, res) => {
  res.render('paygrade/add', {
    layout: 'layouts/main',
    title: 'Add Pay Grade',
    paygrade:{},
  });
});
router.get('/employee-reports/', reportController.generateEmployeeReport);

router.get('/leave-reports/', reportController.generateLeaveReport);

module.exports = router;
