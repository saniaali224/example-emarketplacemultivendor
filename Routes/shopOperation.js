import express from 'express';
import shop from '../Controllers/storeController';

import superManager from '../Middlewares/isManager';



const ShopRouter = express.Router();






ShopRouter.get('/getAllProductShop', superManager.isManagerOwner, shop.getAllProductsShop);

// ProductRouter.get('/getReturnedProducts', superManager.isManagerOwner, product.getReturnedProducts);
// ProductRouter.get('/getRestockedProducts', superManager.isManagerOwner, product.getRestockedProducts);
// ProductRouter.get('/getProductsoutOfStock', superManager.isManagerOwner, product.getReturnedProducts);
// ProductRouter.get('/getTodayProduct', superManager.isManagerOwner, product.getDailyProduct);
// ProductRouter.get('/getWeeklyProduct', superManager.isManagerOwner, product.getWeeklyProduct);
// ProductRouter.get('/getMonthlyProduct', superManager.isManagerOwner, product.getMonthlyProduct);
// ProductRouter.get('/getYearlyProduct', superManager.isManagerOwner, product.getYearlyProduct);
// ProductRouter.get('/getSingleProduct/:eid', superManager.isManagerOwner, product.getSingleProduct);
// ProductRouter.patch('/update/ProductStatus/:id', superManager.isManagerOwner, product.updateProductStatus);

// ProductRouter.get('/getdailyProduct',product.getTodaysProducts);
// ProductRouter.get('/single/getSingleProduct/:eid', product.getSingleProductClient);

export default ShopRouter;