import express from 'express';
import order from '../Controllers/orderController';
import UserAuth from '../Middlewares/loggedIn';
// eslint-disable-next-line no-unused-vars
import Manager from '../Middlewares/isManager';

const orderRouter = express.Router();

orderRouter.post('/addOrder', order.createOrder);

orderRouter.get('/getProcessingOrdersUser',UserAuth.isLoggedIn, order.getuserorderById);

orderRouter.get('/getAllOrders', order.getOrders);

orderRouter.get('/getAllOrdersUser',UserAuth.isLoggedIn, order.getAlluserorderById);

orderRouter.post('/addComplain', UserAuth.isLoggedIn, order.complaintUser);

orderRouter.post('/addReturnOrder', UserAuth.isLoggedIn, order.returnOrderUser);

// orderRouter.patch('/updateOrderStatus', UserAuth.isLoggedIn, order.updateOrderStatus);




export default orderRouter;
