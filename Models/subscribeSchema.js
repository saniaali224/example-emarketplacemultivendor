import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'please provide your email.'],
    },
},
    { timestamps: true }
);
export default mongoose.model('subscribe', SubscriptionSchema);