import express from 'express';
import users from '../Controllers/usersOperations';

import UserAuth from '../Middlewares/loggedIn';



const UserRouter = express.Router();




UserRouter.get('/allUsers', users.getAllUsers);
UserRouter.get('/single/:eid', users.getSingleUser);
UserRouter.delete('/delete/:id', users.deleteUser);
UserRouter.post('/wishlist', UserAuth.isLoggedIn, users.addwishlist);
UserRouter.get('/getwishlist', UserAuth.isLoggedIn, users.getCart);
UserRouter.put('/editUserProfile/:id', UserAuth.isLoggedIn, users.editProfile);
UserRouter.put('/editUserPassword/:id', UserAuth.isLoggedIn, users.editPasssword);

export default UserRouter;