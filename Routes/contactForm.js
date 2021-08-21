import express from 'express';
import contactUs from '../Controllers/contactUs';



const contactRouter = express.Router();



contactRouter.post('/',contactUs.contactUsForm);
contactRouter.get('/allForms', contactUs.getAllForms);
contactRouter.get('/:eid/single',contactUs.getSingleForm);
contactRouter.delete('/:id/delete', contactUs.deleteForm);


export default contactRouter;