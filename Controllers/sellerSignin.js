import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import SellerSchema from '../Models/sellerSchema';

const createToken = (user, res, next) => {
	const { id, email, name,storeId, userType, } = user;
	const payload = {
		_id: id,
		email,
		name,
		storeId,
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

const sellerSignin = (req, res, next) => {
	const { email, password } = req.body;
	SellerSchema.findOne({ email }).then(user => {
		if (user) {
			// if email found compare the password
			bcryptjs.compare(password, user.password).then(result => {
				// if password match create payload
				if (result) {
					createToken(user, res, next);
				} else {
					res.status(400);
					next(new Error('Invalid Password'));
				}
			});
		} else {
			// Wrong Password.
			res.status(400);
			next(new Error('No Seller Exist With This Email'));
		}
	});
};

export default sellerSignin;
