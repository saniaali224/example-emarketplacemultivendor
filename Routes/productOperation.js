import express from 'express';
import product from '../Controllers/productController';

import superManager from '../Middlewares/isManager';



const ProductRouter = express.Router();





ProductRouter.post('/addProducts', superManager.isManagerOwner, product.addProduct);
ProductRouter.get('/getAllProductSeller', superManager.isManagerOwner, product.getAllProductsAdmin);
ProductRouter.get('/getReturnedProducts', superManager.isManagerOwner, product.getReturnedProducts);
ProductRouter.get('/getRestockedProducts', superManager.isManagerOwner, product.getRestockedProducts);
ProductRouter.get('/getProductsoutOfStock', superManager.isManagerOwner, product.getReturnedProducts);
ProductRouter.get('/getTodayProduct', superManager.isManagerOwner, product.getDailyProduct);
ProductRouter.get('/getWeeklyProduct', superManager.isManagerOwner, product.getWeeklyProduct);
ProductRouter.get('/getMonthlyProduct', superManager.isManagerOwner, product.getMonthlyProduct);
ProductRouter.get('/getYearlyProduct', superManager.isManagerOwner, product.getYearlyProduct);
ProductRouter.get('/getSingleProduct/:eid', superManager.isManagerOwner, product.getSingleProduct);
ProductRouter.patch('/update/ProductStatus/:id', superManager.isManagerOwner, product.updateProductStatus);

ProductRouter.get('/getdailyProduct',product.getTodaysProducts);
ProductRouter.get('/single/getSingleProduct/:eid', product.getSingleProductClient);

export default ProductRouter;