const express = require('express');
const router = express.Router();
const passport = require('passport');
const roleController = require('./frontend/controller/role.controller');
const roleService = require('../services/roleAndPermission.service');

router.post('/roles/add', roleController.create);
router.post('/roles/delete', roleController.delete);

router.post('/roles/:role/add/permission', roleController.addPermission);
router.get('/roles/:role/delete/permission/:entity/:action/:group', roleController.deletePermission);

router.post('/roles/:role/add/job', roleController.addJobTitle);
router.get('/roles/:role/delete/job/:job', roleController.deleteJobTitle);

router.post('/roles/:role/add/user', roleController.addUser);
router.get('/roles/:role/delete/user/:user', roleController.deleteUser);


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
