import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema({
  
    firstName: {
        type: String,
        
    },
    email: {
        type: String,
        
    },
    message: {
        type: String
    },
    
  
    

},
    { timestamps: true }
);
export default mongoose.model('complaint', ComplaintSchema);