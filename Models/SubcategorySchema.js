import mongoose from 'mongoose';

const SubCategorySchema = new mongoose.Schema({
  
    subCategoryName: String,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
      },
    
  
    

},
    { timestamps: true }
);
export default mongoose.model('subCategory', SubCategorySchema);