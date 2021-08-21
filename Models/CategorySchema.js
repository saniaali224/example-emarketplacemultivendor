import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  
    categoryName: String,
    subCategoryId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategory',
      }],
    
  
    

},
    { timestamps: true }
);
export default mongoose.model('category', CategorySchema);