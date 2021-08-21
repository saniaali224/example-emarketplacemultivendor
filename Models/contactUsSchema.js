import mongoose from 'mongoose';

const ContactUsSchema = new mongoose.Schema({
  
    name: {
        type: String,
        required: [true, 'please provide your name.']
    },
    email: {
        type: String,
        required: [true, 'please provide your email.'],
    },
    message: {
        type: String
    },
    
  
    

},
    { timestamps: true }
);
export default mongoose.model('contactUs', ContactUsSchema);