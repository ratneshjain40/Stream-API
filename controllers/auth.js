const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const utils = require("../utils/jwtUtils");

exports.registerUser = async (req, res, next) => {
	console.log("In the req veg", req.body);
	try {
		const passwordObj = utils.genPassword(req.body.password);
		const user = await User.create({
			username: req.body.username,
			hash: passwordObj.hash,
			salt: passwordObj.salt,
		});

		if (!user) {
			throw new ErrorResponse("Could not create user", 500);
		}

		const jwt = utils.issueJWT(user);

		res.json({
			success: true,
			user: user,
			token: jwt.token,
			expiresIn: jwt.expires,
		});
	} catch (error) {
		next(error);
	}
};

exports.loginUser = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username })
		if (!user) {
			throw new ErrorResponse("Could not find user");
		}
		const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
		if (isValid) {
			const jwt = utils.issueJWT(user);

			res.json({
				success: true,
				user: user,
				token: jwt.token,
				expiresIn: jwt.expires
			});

		} else {
			throw new ErrorResponse("Password not valid");
		}
	} catch (error) {
		next(error);
	}
};

exports.logoutUser = (req, res, next) => {
	// Logout user
	req.logout();

	res.status(200).json({
		success: true,
		message: "User Logged Out",
	});
};

exports.protectedRoute = (req, res, next) => {
	res.status(200).json({
		success: true,
		message: "This is a protected route",
	});
};

exports.isLoggedIn = async (req, res) => {
	res.status(200).json({
		success: true,
		message: "User Logged In",
		user: req.user,
	});
};
