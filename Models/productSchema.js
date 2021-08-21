import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {

    name: String,
    stock: String,
    salePrice: String,
    price: String,
    size: [],
    colors: [],
    brand: String,
    category: String,
    subCategory: String,
    description: String,
    productStatus: {
      type: String,
      default: 'instock'
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', ProductSchema);