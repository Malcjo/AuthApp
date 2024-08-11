const express = require('express');
const authMiddleware = require('../config/authMiddleware');
const { registerUser, loginUser, userData, updateUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/userdata', authMiddleware, userData);
router.post('/update', updateUser);

module.exports = router;