const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
		},
		password: {
			type: String,
		},
		Address: {
			type: String,
		},
		Telephone: {
			type: String,
		},
		storeId:{
			type: mongoose.Schema.Types.ObjectId,
            ref: 'Store',
		},
		
		city: {
			type: String,
		},
		userType: {
			type: String,
			default: 'admin',
		},
		imageUrl: {
			type: String,
			default: '',
		},
		addedByAdmin:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'superAdmin',
        },
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('Seller', sellerSchema);
