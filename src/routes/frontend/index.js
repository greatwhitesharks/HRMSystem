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
const isAdmin = (req, res, next) => {
  if (req.user.roles.includes('admin')) {
    return next();
  } else {
    next()
    // return res.status(404);
  }
};

const canDo = (perm) =>{
  const method = (req, res, next) => {
    console.log(req.user);
    if (req.user.perms.includes(perm) || req.user.roles.includes('admin')) {
      return next();
    } else {
      res.status(404);
      
      return res.end('No permission');
    }
  };
  return method;
};

const LeaveService =
  require('../../services/absence.service');
const reportController = require('../controllers/report.controller');
router.get('/',
    ensureLoggedIn('/login')
    ,
    (req, res) => {
      res.render('dashboard', {layout: 'layouts/main', title: 'Dashboard'});
    });


router.get('/edit-employee/:id',
    ensureLoggedIn('/login'), canDo('create_employee_record_all'),
    async (req, res) => {
      const service = new CustomAttributeService(db);
      const attributes = await service.getAttributes(['*']);
      let departments = await (new (require('../../db/common/baseRepository'))(db, 'department')).getAll();
      console.log(departments);
      departments = departments.map((x)=>{
        return {id: x.id, lbl: x.name};
      });


      let paygrades = await(new (require('../../db/common/baseRepository'))(db, 'paygrade')).getAll();
      paygrades = paygrades.map((x)=>{
        return {id: x.name, lbl: x.name};
      });

      let jobTitles = await(new (require('../../db/common/baseRepository'))(db, 'job_title')).getAll();
      jobTitles = jobTitles.map((x)=>{
        return {id: x.title, lbl: x.title};
      });

      let empTypes = await(new (require('../../db/common/baseRepository'))(db, 'employement_type')).getAll();
      empTypes = empTypes.map((x)=>{
        return {id: x.type, lbl: x.type};
      });

      let employees = await(new (require('../../db/common/baseRepository'))(db, 'employee_record')).getAll();
      employees = employees.map((x)=>{
        return {id: x.type, lbl: `${x.id} - ${x.first_name} ${x.last_name}`};
      });
      employees = employees.filter((x)=> x.id != req.params.id);
      const employee = await(new (require('../../services/employeeRecord.service'))(db)).getById( req.params.id);
      console.log(employee);
      res.render('records/edit', {
        layout: 'layouts/main',
        title: 'Edit Employee Record',
        attributes,
        departments,
        jobTitles,
        paygrades,
        empTypes,
        employees,
        employee,
      });
    });

router.get('/add-employee',
    ensureLoggedIn('/login'), canDo('create_employee_record_all'),
    async (req, res) => {
      const service = new CustomAttributeService(db);
      const attributes = await service.getAttributes(['*']);
      let departments = await (new (require('../../db/common/baseRepository'))(db, 'department')).getAll();
      console.log(departments);
      departments = departments.map((x)=>{
        return {id: x.id, lbl: x.name};
      });


      let paygrades = await(new (require('../../db/common/baseRepository'))(db, 'paygrade')).getAll();
      paygrades = paygrades.map((x)=>{
        return {id: x.name, lbl: x.name};
      });

      let jobTitles = await(new (require('../../db/common/baseRepository'))(db, 'job_title')).getAll();
      jobTitles = jobTitles.map((x)=>{
        return {id: x.title, lbl: x.title};
      });

      let empTypes = await(new (require('../../db/common/baseRepository'))(db, 'employement_type')).getAll();
      empTypes = empTypes.map((x)=>{
        return {id: x.type, lbl: x.type};
      });

      let employees = await(new (require('../../db/common/baseRepository'))(db, 'employee_record')).getAll();
      employees = employees.map((x)=>{
        return {id: x.id, lbl: `${x.id} - ${x.first_name} ${x.last_name}`};
      });

      console.log(jobTitles);
      res.render('records/add', {
        layout: 'layouts/main',
        title: 'Create Employee Record',
        attributes,
        departments,
        jobTitles,
        paygrades,
        empTypes,
        employees,
      });
    });

router.get('/login',
    ensureLoggedOut('/')
    , (req, res) => {
      res.render('login', {
        layout: 'layouts/guest',

      });
    });


router.get('/branch/add', ensureLoggedIn('/login'), isAdmin, (req, res) => {
  res.render('branch/single', {
    layout: 'layouts/main',
    title: 'Add Branch',
    branch: {},
  });
});

router.get('/leave/viewAll', ensureLoggedIn('/login'), async (req, res) => {
  const leaveService= new LeaveService(db);
  const supervisorId=2;// for test purpses
  console.log(req.user);
  const leaveInfoAll=await leaveService.getLeaveInfoAll(supervisorId);
  res.render('leave/all', {
    layout: 'layouts/main',
    title: 'Leave Manger',
    leaveInfoAll,
  });
});

router.get('/leave/approve/:id', ensureLoggedIn('/login'), async (req, res) => {
  const supervisorId=req.user.record.id;
  const leaveService= new LeaveService(db);
  router.get('/leave/add', async (req, res) => {
    const leaveService= new LeaveService(db);
    const employeeId=1;// for test purpses
    const leaveInfo=await leaveService.getLeaveInfo(employeeId);
    res.render('leave/single', {
      layout: 'layouts/main',
      title: 'Leave Details And Form',
      leaveInfo,
    });
  });
});

  router.post('/leave/apply', ensureLoggedIn('/'), async (req, res) => {
    const leaveService= new LeaveService(db);
    const id=req.user.record.id;
    const {
      type,
      from,
      to,
      comment}=req.body;
    const stmt=await leaveService.applyLeave(id, type, from, to, comment);
    console.log(stmt);
  });

  router.get('/leave/approve/:id', async (req, res) => {
    const supervisorId= req.user.record.id;
    const leaveService= new LeaveService(db);
    const leave = await leaveService.getById(req.params.id);
    await leaveService.approveLeave(leave, supervisorId);
    res.redirect('/leave/viewAll');
  });
  router.get('/leave/decline/:id', async (req, res) => {
    const supervisorId= req.user.record.id;
    const leaveService= new LeaveService(db);
    const leave = await leaveService.getById(req.params.id);
    await leaveService.declineLeave(leave, supervisorId);
    res.redirect('/leave/viewAll');
  });

  router.get('/department/add', ensureLoggedOut('/login'), isAdmin, (req, res) => {
    res.render('department/single', {
      layout: 'layouts/main',
      title: 'Add Department',
      department: {},
    });
  });

  router.get('/department/remove/:id', ensureLoggedIn('/login'), isAdmin, (req, res) => {
    res.render('department/single', {
      layout: 'layouts/main',
      title: 'Add Department',
      department: {},
    });
  });


  /**
 * Employee By Properies (Department Name, PayGrade, JobTitle, Employment Type, Custom Attributes)
 * Leaves by  Properties
 *
 */
  router.get('/job/add', ensureLoggedIn('/login'), isAdmin, (req, res) => {
    res.render('job/add', {
      layout: 'layouts/main',
      title: 'Add Job',
      job: {},
    });
  });

  router.get('/paygrade/add', ensureLoggedIn('/login'), isAdmin, (req, res) => {
    res.render('paygrade/add', {
      layout: 'layouts/main',
      title: 'Add Pay Grade',
      paygrade: {},
    });
  });

  router.get('/paygrade/leavechange', ensureLoggedIn('/login'), isAdmin, (req, res) => {
    res.render('paygrade/change', {
      layout: 'layouts/main',
      title: 'Change Pay Grade Leave Limit',
      paygradelimit: {},
    });
  });

  router.get('/fetch', ensureLoggedIn, (req, res) =>{
    res.json(req.user);
  });

  router.get('/employee-reports/', canDo('read_report_all'), reportController.generateEmployeeReport);

  router.get('/leave-reports/', canDo('read_report_all'), reportController.generateLeaveReport);

  router.get('/empType/add', /*ensureLoggedIn('/login'), isAdmin,*/ (req, res) => {
    res.render('empType/add', {
      layout: 'layouts/main',
      title: 'Add Employee Type',
      empType: {},
    });
  });

/**
=======
 * Roles
 *
 */

  router.get('/roles/', ensureLoggedIn('/login'), isAdmin, async (req, res)=>{
    const roles = await (new RoleService(db)).getRoles();
    console.log(roles);
    res.render('role/all', {
      layout: 'layouts/main',
      roles: roles,
      title: 'All Roles',
    });
  });


  router.get('/roles/:role/add/user', ensureLoggedIn('/login'), isAdmin, async (req, res)=>{
    let users = await (new RecordService(db)).getUsers();
    users = users.map( (x) =>{
      return {
        id: x.id,
        lbl: _.startCase(`${x.id} - ${x.first_name} ${x.last_name}`),
      };
    });


  res.render('role/addUser', {
    layout: 'layouts/main',
    title: 'Add User to Role',
    users,
    role: req.params.role,
  });


  });

router.get('/roles/:role/add/permission', ensureLoggedIn('/login'), isAdmin, async (req, res)=>{
  let permissions = await (new RoleService(db)).getPermissions();
  permissions = permissions.map((x) => {
    return {
      val: `${x.action}_${x.entity}_${x.group}`,
      lbl: `${x.action} ${x.entity} in ${x.group}`,
    };
  });
  res.render('role/addPermission', {
    layout: 'layouts/main',
    title: 'Add User to Role',
    permissions,
    role: req.params.role,
  });
});

router.get('/roles/:role/add/job', ensureLoggedIn('/login'), isAdmin, async (req, res)=>{
  let jobs = await (new BaseRepository(db, 'job_title')).getAll();
  jobs = jobs.map((x)=>{
    return {val: x.title, lbl: _.startCase(x.title)};
  });

  console.log(req.params.role+
  'sdas');
  res.render('role/addJobTitle', {
    layout: 'layouts/main',
    title: 'Add Job Title to Role',
    jobs,
    role: req.params.role,
  });
});


router.get('/roles/add', ensureLoggedIn('/login'), isAdmin, (req, res)=>{
  res.render('role/createRole', {
    layout: 'layouts/main',
    title: 'Add Role',
  }); reate;
});

router.get('/roles/:role/remove', ensureLoggedIn('/login'), isAdmin, async (req, res)=>{
  await (new RoleService(db)).deleteRole(req.params.role);
  res.redirect('/roles');
});

router.get('/roles/:role', ensureLoggedIn('/login'), isAdmin, async (req, res)=>{
  const users = await (new RoleService(db)).getUsersInRole(req.params.role);
  const perms = await (new RoleService(db)).getPermissionsInRole(req.params.role);
  const jobs = await (new RoleService(db)).getJobsInRole(req.params.role);
  console.log(jobs);
  res.render('role/single', {
    layout: 'layouts/main',
    title: 'Role',
    role: req.params.role,
    users,
    perms,
    jobs,
  });
});


router.get('/custom-attribute/create', (req, res)=>{
  res.render('custom/add', {
    layout: 'layouts/main',
    title: 'Create Attributte',
    attribute: {},
  });
});


router.post('/custom-attribute/create', async (req, res)=>{
  await (new (require('../../services/customAttribute.service'))(db)).createAttribute(
      req.body.attributeName,
      req.body.attributeDefault,
      'text',
  );
  req.flash('success', 'Success');
  res.redirect('/custom-attribute/create');
});


// router.get('custom-attribute/all')

// router.get('custom-attribute/delete')

module.exports = router;
