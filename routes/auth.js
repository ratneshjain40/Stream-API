const express = require('express');
const router = express.Router();

// Import controllers
const {
	registerUser,
	loginUser,
	logoutUser,
	protectedRoute,
	isLoggedIn,
} = require('../controllers/auth'); 

// Middleware
const { isAuth } = require('../middlewares/isAuth');

// Map controllers
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/is-logged',isAuth, isLoggedIn);
router.get('/protected-route', isAuth, protectedRoute);

module.exports = router;
