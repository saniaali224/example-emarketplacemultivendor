const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		uid: String,
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,

		},
		password: {
			type: String,
		},
		email: {
			type: String,
			required: true,
		},
		userType: {
			type: String,
			default: 'user',
		},
		imageUrl: {
			type: String,
			default: '',
		},
		googleId: {
			type: String,
			default: null,
		},
		facebookId: {
			type: String,
			default: null,
		},		
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('User', userSchema);
