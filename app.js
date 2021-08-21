/* eslint-disable func-names */
import express from 'express';
import cors from 'cors';
import status from 'http-status';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import passport from 'passport';
import dbConnection from './Connection/dbConnect';
import Router from './Routes/Router';
import errorHandler from './Middlewares/errorHandler';
import verifyToken from './Middlewares/verifyToken';

dbConnection();

const app = express();

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(
	express.urlencoded({
		extended: false,
	}),
);

// will decode token from each request in {req.user}
app.use(verifyToken.verifyTokenSetUser);

app.use(express.json());

app.get('/', (req, res) => {
	res.status(status.OK).send({ Message: 'Connected', status: status.OK });
});

app.use('/signup', Router.SignupRouter);

app.use('/signin', Router.SigninRouter);

app.use('/superAdmin', Router.SuperAdminRouter);

app.use('/contactUs',Router.ContactUsRouter);

app.use('/joinUs',Router.JoinUsRouter);

app.use('/newsletter',Router.SubscribeRouter);

app.use('/users',Router.UserRouter);

app.use('/order',Router.orderRouter);

app.use('/ship',Router.shipRouter);

app.use('/seller',Router.SellerRouter);

app.use('/product',Router.productRouter);

app.use('/shop',Router.shopRouter);

app.use('/review',Router.reviewRouter);




// i have implemented it in signup controller like this {next(new Error('Image is required'))}
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () =>
	console.log(`App listening On port http://localhost:${port}`),
);
