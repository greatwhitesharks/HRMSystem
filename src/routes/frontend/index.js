const express = require('express');
const router = express.Router();
const db = require('../../db');
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');
const CustomAttributeService =
  require('../../services/customAttribute.service');

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


router.get('/department/add', (req, res) => {
  res.render('department/single', {
    layout: 'layouts/main',
    title: 'Add Department',
  });
});
/**
 * Employee By Properies (Department Name, PayGrade, JobTitle, Employment Type, Custom Attributes)
 * Leaves by  Properties
 *
 */

router.get('/employee-reports/', reportController.generateEmployeeReport);

router.get('/leave-reports/', reportController.generateLeaveReport);

module.exports = router;
