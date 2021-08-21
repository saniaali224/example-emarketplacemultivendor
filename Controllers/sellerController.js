import status from 'http-status';
import bcryptjs from 'bcryptjs';
import SellerModel from '../Models/sellerSchema';



  const editProfile = async (req, res) => {
    const { id } = req.params;
  
  
    const query = {
      $set: req.body
    };
  
    SellerModel.findByIdAndUpdate(id,  query , { new: true }, (err, result) => {
      if (err) {
        res.status(status.INTERNAL_SERVER_ERROR).send({
          Message: 'Unable to Update.',
          err
        });
        console.log(err);
      } else {
        res.status(status.OK).send({
          Message: 'Successfully Updated.',
          result,
        });
      }
    });
  };
  const editPasssword = async (req, res) => {
    const { id } = req.params;
    const {
  
      password,
  
    } = req.body;
  
    const hashedpassword = await bcryptjs.hash(password, 12);
  
    const query = {
  
      password: hashedpassword,
  
    };
  
   SellerModel.findByIdAndUpdate(id, { $set: query }, { new: true }, (err, result) => {
      if (err) {
        res.status(status.INTERNAL_SERVER_ERROR).send({
          Message: 'Unable to Update.',
          err
        });
        console.log(err);
      } else {
        res.status(status.OK).send({
          Message: 'Successfully Updated.',
          result,
        });
      }
    });
  };
  export default {editProfile,editPasssword};