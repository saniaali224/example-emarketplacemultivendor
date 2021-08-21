import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({

    productImage: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    userName: String,
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    stars:Number





},
    { timestamps: true }
);
export default mongoose.model('review', ReviewSchema);