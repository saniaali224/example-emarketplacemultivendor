import express from 'express';
import reviews from '../Controllers/ReviewsController';
import UserAuth from '../Middlewares/loggedIn';
import superManager from '../Middlewares/isManager';


const reviewRouter = express.Router();



reviewRouter.post('/addReview',UserAuth.isLoggedIn,reviews.review);
reviewRouter.get('/allForms',superManager.isManagerOwner );
// joinUsRouter.get('/newRequest', joinUs.getlatestForm);
// joinUsRouter.get('/Complaints', joinUs.getAllComplaints);
// joinUsRouter.get('/singleComplaints/:eid', joinUs.getSingleComplaint);
// joinUsRouter.get('/:eid/single',joinUs.getSingleForm);
// joinUsRouter.delete('/:id/delete', joinUs.deleteForm);

export default reviewRouter;