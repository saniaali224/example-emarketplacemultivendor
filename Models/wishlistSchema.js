import mongoose from 'mongoose';

const WishlistSchema = new mongoose.Schema({
  
    item: [],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    
  
    

},
    { timestamps: true }
);
export default mongoose.model('wishlist', WishlistSchema);