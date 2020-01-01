const AttributeController = require('./controllers/attribute.controller');
const express = require('express');
const router = express.Router();

router.post('/save', AttributeController.save);
router.post('/delete', AttributeController.delete);
module.exports = router;
