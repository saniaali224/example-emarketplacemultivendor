const isSuperManager = (req, res, next) => {
	if (!req.user) {
		res.status(400).send({
			Message: 'SuperAdmin not logged In.',
		});
	} else if (req.user.userType == 'SuperAdmin') {
		return next();
	} else {
		res.status(400).send({
			Message: 'This operation has restricted access.',
		});
	}
};

module.exports = {
	isSuperManager,
};
