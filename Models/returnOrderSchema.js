import mongoose from 'mongoose';

const ReturnOrderSchema = new mongoose.Schema({

    firstName: {
        type: String,

    },
    email: {
        type: String,

    },
    productNumber: String,
    storeName: String,
    message: {
        type: String
    },




},
    { timestamps: true }
);
export default mongoose.model('returnOrder', ReturnOrderSchema);