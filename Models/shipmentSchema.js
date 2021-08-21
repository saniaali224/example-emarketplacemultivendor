import mongoose from 'mongoose';

const   ShipmentSchema = new mongoose.Schema(
  {
    
    address: String,
    phone: String,
    postalCode: String,
    userEmail: String,
    userFirstName: String,
    userLastName: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Ship', ShipmentSchema);