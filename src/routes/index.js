const express = require('express');
const router = express.Router();
const passport = require('passport');
const roleController = require('./frontend/controller/role.controller');
const roleService = require('../services/roleAndPermission.service');

router.post('/role/add', roleController.create);
router.post('/role/delete', roleController.delete);

router.post('/role/:role/permission/add', roleController.addPermission);
router.post('/role/:role/permission/delete', roleController.deletePermission);

router.post('/role/:role/job/add', roleController.addJobTitle);
router.post('/role/:role/job/delete', roleController.deleteJobTitle);

router.post('/role/:role/user/add', roleController.addUser);
router.post('/role/:role/user/delete', roleController.deleteUser);


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
