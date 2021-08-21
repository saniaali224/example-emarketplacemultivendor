import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import UserModel from '../Models/userSchema';



const userSignUp = (req, res, next) => {
	const { firstName, lastName, password, email } = req.body;


	const query = { email };

	UserModel.findOne(query)
		.then((user) => {
			if (user) {
				if (user.email == email) {
					res.status(400);
					next(new Error('Email Already Taken.'));
				}
			} else {
				bcryptjs.hash(password, 12).then((hashedpassword) => {
					const User = new UserModel({
						uid : uuidv4(),
						firstName,
						lastName,
						password: hashedpassword,
						email,

						userType: 'user',
					});
					// console.log(User);
					User.save()
						.then((SavedUser) => {
							console.log(SavedUser);
							return res.status(200).send({
								Message: 'Account Created Successfully.',
								id:SavedUser.uid,
								firstName: SavedUser.firstName,
								lastName:SavedUser.lastName,
								email: SavedUser.email
								
							});
						})
						.catch((err) => {
							res.status(500);
							next(
								new Error(
									`Unable to Create User. Please Try later. ${err}`,
								),
							);
						});
				});
			}
		})
		.catch((err) => {
			res.status(500);
			next(new Error(err));
		});


};

export default userSignUp;
