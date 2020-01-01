const express = require('express');
const router = express.Router();
const passport = require('passport');

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
