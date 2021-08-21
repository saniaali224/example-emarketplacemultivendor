import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    orderItems: [],
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
    orderStatus: {
      type: String,
      default: 'processing',
    },
    TrackingId: {
      type: String,
      default: 'none',
    },
    PaymentMethod: String,
    Deliverymode: {
      type: String,
    },
    totalPrice: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', OrderSchema);