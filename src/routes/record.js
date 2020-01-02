const RecordController = require('./controllers/record.controller');
const express = require('express');
const router = express.Router();
const path = require('path');
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
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../web/public/upload/'));
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '.jpg'); // Appending .jpg
  },
});

const upload = multer({storage: storage});

router.post('/create', upload.single('photo'), RecordController.create);
router.post('/edit-employee/:id', ensureLoggedIn('/login'), canDo('create_employee_record_all'), RecordController.save)
router.get('/:id', RecordController.view);
router.get('/search/', RecordController.search);
router.post('/dependents/add/:id', RecordController.saveDependentInfo);
module.exports = router;
