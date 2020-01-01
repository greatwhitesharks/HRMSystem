const RecordController = require('./controllers/record.controller');
const express = require('express');
const router = express.Router();
const path = require('path');

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
router.get('/:id', RecordController.view);
router.get('/search/', RecordController.search);
router.post('/dependents/add/:id', RecordController.saveDependentInfo);
module.exports = router;
