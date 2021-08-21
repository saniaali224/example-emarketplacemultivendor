import jwt from 'jsonwebtoken';

const createToken = (user, res, next) => {
	const { id, email, name, userType, } = user;
	const payload = {
		_id: id,
		email,
		name,
		userType,
		
	};
	// console.log(payload);
	// create a token
	jwt.sign(
		payload,
		process.env.JwtSecret,
		{
			expiresIn: '365d',
		},
		(err, token) => {
			// Error Create the Token
			if (err) {
				res.status(500);
				next(new Error('Unable to generate Token.'));
			} else {
				// Token Created
				res.json({
					token,
				});
			}
		},
	);
};

const adminSignin = (req, res, next) => {
	const { email, password } = req.body;
	if (email == 'arreyyahTech01@gmail.com' && password == 'qwerty000') {
		const user = {
			id: '5e944eb2b2badf1b984e7284',
			email: 'arreyyahTech01@gmail.com',
			name: 'Admin',
			userType: 'SuperAdmin',
			
			
		};

		createToken(user, res, next);
	} else {
		res.status(400);
		next(new Error('Invalid email or Password'));
	}
};

export default adminSignin;
