const express = require('express');
const router = express.Router();
const db = require('../../db');
const _ = require('lodash');
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');
const CustomAttributeService =
  require('../../services/customAttribute.service');
const RoleService = require('../../services/roleAndPermission.service');
const BaseRepository = require('../../db/common/baseRepository');
const RecordService = require('../../services/employeeRecord.service');

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
    title: 'LeaveManger',
    leaveInfoAll,
  });
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

router.get('/paygrade/leavechange', (req, res) => {
  res.render('paygrade/change', {
    layout: 'layouts/main',
    title: 'Change Pay Grade Leave Limit',
    paygradelimit:{},
  });
});

router.get('/employee-reports/', reportController.generateEmployeeReport);

router.get('/leave-reports/', reportController.generateLeaveReport);


/**
 * Roles
 *
 */

router.get('/roles/', async (req, res)=>{
  const roles = await (new RoleService(db)).getRoles();
  console.log(roles);
  res.render('role/all', {
    layout: 'layouts/main',
    roles: roles,
    title: 'All Roles',
  });
});


router.get('/roles/:role/add/user', async (req, res)=>{
  let users = await (new RecordService(db)).getUsers();
  users = users.map( x =>{
    return {
      id:x.id, 
      lbl: _.startCase(`${x.id} - ${x.first_name} ${x.last_name}`),
    }
});

  res.render('role/addUser', {
    layout: 'layouts/main',
    title: 'Add User to Role',
    users,
    role: req.params.role,
  });
});

router.get('/roles/:role/add/permission', async (req, res)=>{
  let permissions = await (new RoleService(db)).getPermissions();
  permissions = permissions.map(x => {
    return {
      val: `${x.action}_${x.entity}_${x.group}`,
      lbl: `${x.action} ${x.entity} in ${x.group}`
    }
  });
  res.render('role/addPermission', {
    layout: 'layouts/main',
    title: 'Add User to Role',
    permissions,
    role: req.params.role,
  });
});

router.get('/roles/:role/add/job', async (req, res)=>{
  let jobs = await (new BaseRepository(db, 'job_title')).getAll();
  jobs = jobs.map(x=>{ 
    return {val:x.title, lbl:_.startCase(x.title)};
});

console.log(req.params.role+
  'sdas')
  res.render('role/addJobTitle', {
    layout: 'layouts/main',
    title: 'Add Job Title to Role',
    jobs,
    role: req.params.role,
  });
});


router.get('/roles/add', (req, res)=>{
  res.render('role/createRole', {
    layout: 'layouts/main',
    title: 'Add Role',
  });
});

router.get('/roles/:id', (req, res)=>{
  res.render('role/single', {
    layout: 'layouts/main',
    title: 'Role',
    role: {},
  });
});
module.exports = router;
