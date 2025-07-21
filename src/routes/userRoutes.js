const express = require('express');
const router = express.Router();
const { me } = require('../controllers/userController');

router.get('/me', me);

module.exports = router;