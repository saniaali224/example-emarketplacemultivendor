
import jwt from 'jsonwebtoken';

import UserModel from '../Models/userSchema';

const createToken = (user, res, next) => {
	const { id, email, firstName } = user;
	console.log(process.env.JwtSecret);
	const payload = {
		_id: id,
		email,
		firstName,
		
		
	};
	
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

const GoogleSignIn = (req, res, next) => {
	const { googleId, email, firstName,lastName } = req.body;
	console.log(req.body);
	  UserModel.findOne({ googleId }).then(user => {
		  if (user) {
			  console.log(user);
			  
			  createToken(user, res, next);
		  } else {
			  const newUser = new UserModel({
				  firstName,
				  lastName,
				  email,
				  googleId,
				  
			  });
			  newUser.save().then(SavedUser => {
				 createToken(SavedUser, res, next);
			  }).catch(err => {
				  res.status(500);
				  next(new Error('Internal Server Error! Please Try later.'),err);
			  });
		  }
	  }).catch(err => {
		  res.status(500);
		  next(new Error('Internal Server Error! Please Try later.',err));
	  });
  };

export default GoogleSignIn;
