const express = require('express');
const router = express.Router();
const passport = require('passport');
const roleController = require('./frontend/controller/role.controller');
const roleService = require('../services/roleAndPermission.service');

router.post('/roles/add', roleController.create);
router.post('/roles/delete', roleController.delete);

router.post('/roles/:role/add/permission', roleController.addPermission);
router.post('/roles/:role/delete/permission', roleController.deletePermission);

router.post('/roles/:role/add/job', roleController.addJobTitle);
router.post('/roles/:role/delete/job', roleController.deleteJobTitle);

router.post('/roles/:role/add/user', roleController.addUser);
router.post('/roles/:role/delete/user', roleController.deleteUser);


router.post('/login', passport.authenticate('local',
    {
      failureRedirect: '/login',
      failureFlash: 'Incorrect email/password',
    }), (req, res)=>{
  res.redirect('/');
},
);

router.get('/logout',
    function(req, res) {
      req.logout();
      res.redirect('/');
    });


    

module.exports = router;
