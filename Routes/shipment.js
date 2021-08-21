import express from 'express';
import ship from '../Controllers/shipmentController';
import UserAuth from '../Middlewares/loggedIn';

const shipRouter = express.Router();



shipRouter.get('/getshipmentUser',UserAuth.isLoggedIn,ship.getusershipmentById );
shipRouter.get('/deleteshipment/:id',UserAuth.isLoggedIn,ship.deleteShipment );


export default shipRouter;
