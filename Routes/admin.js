import express from 'express';
import adminSignIn from '../Controllers/superAdminOperations';
import category from '../Controllers/categoryController';
import superManager from '../Middlewares/isSuperManager';


const adminRouter = express.Router();



adminRouter.post('/addSeller',superManager.isSuperManager, adminSignIn.addSeller);
adminRouter.get('/getSeller',superManager.isSuperManager, adminSignIn.getAllSellers);
adminRouter.delete('/removeSeller/:id',superManager.isSuperManager, adminSignIn.deleteSeller);
adminRouter.get('/Seller/:eid',superManager.isSuperManager, adminSignIn.getSingleSeller);
adminRouter.get('/incomingOrders',superManager.isSuperManager, adminSignIn.getorders);
adminRouter.get('/singleOrders/:eid',superManager.isSuperManager, adminSignIn.getSingleOrder);
adminRouter.post('/addCategory',superManager.isSuperManager, category.createCategory);
adminRouter.get('/getCategory',superManager.isSuperManager, category.getCategory);
adminRouter.get('/getCategory/:eid',superManager.isSuperManager, category.getSingleCategory);
adminRouter.post('/addSubCategory',superManager.isSuperManager, category.addSubCategory);
adminRouter.delete(
	'/delete/:id',
	superManager.isSuperManager,
	category.deleteCategory,
);


export default adminRouter;
