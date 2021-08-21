import express from 'express';
import userSignIn from '../Controllers/userSignin';
import adminSignIn from '../Controllers/adminSignin';
import sellersignIn from '../Controllers/sellerSignin';
import userGoogleLogin from '../Controllers/userGoogleSignin';
import userFacbookLogin from '../Controllers/userFacebookSignin';
import userValidator from '../validations/user';

const signInRouter = express.Router();

signInRouter.post('/user', userValidator.userSignin, userSignIn);

signInRouter.post('/sellersignIn', sellersignIn);

signInRouter.post('/GoogleSignIn', userGoogleLogin);

signInRouter.post('/admin', adminSignIn);

signInRouter.post('/FacebookSignIn', userFacbookLogin);

export default signInRouter;
