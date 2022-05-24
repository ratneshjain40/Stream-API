const passport = require("passport");

exports.isAuth = (req, res, next) => {
	return passport.authenticate("jwt", { session: false })(req, res, next);
};
