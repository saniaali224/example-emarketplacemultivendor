import express from 'express';
import seller from '../Controllers/sellerController';
import superAdminOperation from '../Controllers/superAdminOperations';

import superManager from '../Middlewares/isManager';
import superAdmin from '../Middlewares/isSuperManager';



const SellerRouter = express.Router();





SellerRouter.put('/editSellerProfile/:id', superManager.isManagerOwner, seller.editProfile);
SellerRouter.put('/editSellerPassword/:id', superManager.isManagerOwner, seller.editPasssword );
SellerRouter.get('/dailyOrders', superAdmin.isSuperManager, superAdminOperation.getDailyOrdersCount );
SellerRouter.get('/monthlyOrders', superAdmin.isSuperManager, superAdminOperation.getMonthlyOrderCount);
SellerRouter.get('/weeklyOrders', superAdmin.isSuperManager, superAdminOperation.getWeeklyOrderCount);
SellerRouter.get('/yearlyOrders', superAdmin.isSuperManager, superAdminOperation.getYearlyOrderCount);


export default SellerRouter;