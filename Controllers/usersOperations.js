import status from 'http-status';
import bcryptjs from 'bcryptjs';
import UserModel from '../Models/userSchema';
import WishlistModel from '../Models/wishlistSchema';



const getAllUsers = (req, res) => {
  const { skip = 0, limit = 0, sort = '-1' } = req.query;

  UserModel
    .find({})
    .sort({ _id: sort })
    .skip(Number(skip))
    .limit(Number(limit))
    .then((users) => {
      res.json({
        skip: Number(skip),
        limit: Number(limit),
        count: Number(users.length),
        users,
      });
    }).catch(error => {
      res.status(404).send({
        Message: status.NOT_FOUND,
        error,
      });
      console.log(error);

    })
    .catch(err => {
      res.status(500).send({
        Message: status.INTERNAL_SERVER_ERROR,
        err,
      });
    });
};
const getSingleUser = (req, res) => {
  const { eid } = req.params;

  UserModel.findOne({ _id: eid })
    .then(event => {
      if (!event) {
        return res.status(status.NOT_FOUND).send({
          Message: 'User not found',
        });
      }
      return res.status(status.OK).send(event);
    })
    .catch(err => {
      return res.status(status.INTERNAL_SERVER_ERROR).send({
        Message: 'Internal Server Error',
        err,
      });
    });
};
const deleteUser = (req, res) => {
  const { id } = req.params;
  UserModel.findByIdAndRemove(id, (err, result) => {
    if (result) {
      res.status(status.OK).send({
        Message: ' Deleted Successfully.',
      });
    } else {
      res.status(status.INTERNAL_SERVER_ERROR).send({
        Message: 'Unable to Delete.',
        err,
      });
    }
  });
};

const editProfile = async (req, res) => {
  const { id } = req.params;


  const query = {
    $set: req.body
  };

  UserModel.findByIdAndUpdate(id, query, { new: true }, (err, result) => {
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

  UserModel.findByIdAndUpdate(id, { $set: query }, { new: true }, (err, result) => {
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

const addwishlist = async (req, res) => {
  try {


    const {
      item
    } = req.body;



    const newOrder = WishlistModel({
      item,
      // eslint-disable-next-line no-underscore-dangle
      userId: req.user._id
    });

    newOrder
      .save()


      .then(async (ships) => {

        res.json({ Message: 'Wishlist Added Successfully.', wishlist: ships });
      }).catch((err) => {
        res.json({ err, Message: 'Unable To add Wishlist' });
      });


  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send({
      Message: 'Can not get into add product',
      error,
    });
  }
};
const getCart= (req, res) => {
  const { skip = 0, limit = 0, sort = '-1' } = req.query;

  WishlistModel
    // eslint-disable-next-line no-underscore-dangle
    .find({userId: req.user._id})
    .sort({ _id: sort })
    .skip(Number(skip))
    .limit(Number(limit))
    .then((items) => {
      res.json({
        skip: Number(skip),
        limit: Number(limit),
        count: Number(items.length),
        items,
      });
    }).catch(error => {
      res.status(404).send({
        Message: status.NOT_FOUND,
        error,
      });
      console.log(error);

    })
    .catch(err => {
      res.status(500).send({
        Message: status.INTERNAL_SERVER_ERROR,
        err,
      });
    });
};

export default { getAllUsers, getSingleUser, deleteUser, editProfile, editPasssword,addwishlist ,getCart};