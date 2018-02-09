
module.exports.loginRequired = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.status(401).json({ 
			message: new Error('Unauthorized user!').message
		});
	}
};