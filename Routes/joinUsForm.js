import express from 'express';
import joinUs from '../Controllers/joinUs';



const joinUsRouter = express.Router();



joinUsRouter.post('/',joinUs.joinUsForm);
joinUsRouter.get('/allForms', joinUs.getAllForms);
joinUsRouter.get('/newRequest', joinUs.getlatestForm);
joinUsRouter.get('/Complaints', joinUs.getAllComplaints);
joinUsRouter.get('/singleComplaints/:eid', joinUs.getSingleComplaint);
joinUsRouter.get('/:eid/single',joinUs.getSingleForm);
joinUsRouter.delete('/:id/delete', joinUs.deleteForm);

export default joinUsRouter;