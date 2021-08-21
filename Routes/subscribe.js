import express from 'express';
import subscribe from '../Controllers/subscribe';



const subscriptionRouter = express.Router();



subscriptionRouter.post('/subscribe',subscribe.subscribe);
subscriptionRouter.get('/allSubscriptions', subscribe.getAllSubscriptions);
subscriptionRouter.get('/:eid/single',subscribe.getSingleSubscriber);
subscriptionRouter.delete('/:id/delete', subscribe.deleteSubscription);


export default subscriptionRouter;