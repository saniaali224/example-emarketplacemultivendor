const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema(
	{
		shopName: {
			type: String,
			required: true,
		},
		
		shopType: {
			type: String,
		},
		adminId:{
			type: mongoose.Schema.Types.ObjectId,
            ref: 'Seller',
		},
		
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('Store', storeSchema);
