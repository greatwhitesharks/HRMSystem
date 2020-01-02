const express = require('express');
const router = express.Router();
const passport = require('passport');
const roleController = require('./frontend/controller/role.controller');
const roleService = require('../services/roleAndPermission.service');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const isAdmin = (req, res, next) => {
  if (req.user.roles.includes('admin')) {
    return next();
  } else {
    return res.status(404);
  }
};

const canDo = (perm) =>{
  return (req, res, next) => {
    if (req.perms.includes(perm)) {
      return next();
    } else {
      return res.status(404);
    }
  };
}

router.post('/roles/add', ensureLoggedIn('/login'), isAdmin, roleController.create);
router.post('/roles/delete', ensureLoggedIn('/login'), isAdmin, roleController.delete);

router.post('/roles/:role/add/permission', ensureLoggedIn('/login'), isAdmin, roleController.addPermission);
router.get('/roles/:role/delete/permission/:entity/:action/:group', ensureLoggedIn('/login'), isAdmin, roleController.deletePermission);

router.post('/roles/:role/add/job', ensureLoggedIn('/login'), isAdmin, roleController.addJobTitle);
router.get('/roles/:role/delete/job/:job', ensureLoggedIn('/login'), isAdmin, roleController.deleteJobTitle);

router.post('/roles/:role/add/user', ensureLoggedIn('/login'), isAdmin, roleController.addUser);
router.get('/roles/:role/delete/user/:user', ensureLoggedIn('/login'), isAdmin, roleController.deleteUser);


router.post('/login', passport.authenticate('local',
    {
      failureRedirect: '/login',
      failureFlash: 'Incorrect email/password',
      successReturnToOrRedirect: '/'
    }), (req, res)=>{

},
);

router.get('/logout',
    function(req, res) {
      req.logout();
      res.redirect('/');
    });


module.exports = router;
