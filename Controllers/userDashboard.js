// /* eslint-disable no-underscore-dangle */
// /* eslint-disable array-callback-return */
// import status from 'http-status';
// // import awsHandler from './aws';

// import bcryptjs from 'bcryptjs';
// import SellerSchema from '../Models/sellerSchema';
// import StoreScehma from '../Models/storeSchema';

// // import MenuSchema from '../Models/menuSchema';
// // import CategorySchema from '../Models/categorySchema';

// // const SettingUpdate = (req, res) => {
// //   const { id } = req.params;
// //   const query = { $set: req.body };
// //   ItemSchema.findByIdAndUpdate(id, query, { new: true }, (err, result) => {
// //     if (err) {
// //       res.status(status.INTERNAL_SERVER_ERROR).send({
// //         Message: 'Unable to Update Menu.',
// //       });
// //     } else {
// //       res.status(status.OK).send({
// //         Message: 'Successfully Updated Menu.',
// //         result,
// //       });
// //     }
// //   });
// // };

// // const getAllSellers = (req, res) => {
// //   // eslint-disable-next-line no-underscore-dangle
// //   SellerSchema.find({ addedByAdmin: req.user._id })
// //     .populate('storeId', 'shopName shopType')
// //     .then(events => {
// //       res.status(status.OK).send(events);
// //     })
// //     .catch(err => {
// //       res.status(status.INTERNAL_SERVER_ERROR).send({
// //         Message: 'No Sellers!',
// //         err,
// //       });
// //     });
// // };

// // const addstoreRefToAdmin = (adminId, sId) => {
// //   return new Promise((resolve, reject) => {
// //     // pushing id of comment to Article Model to get the comment by referemnce is articles
// //     SellerSchema.findOneAndUpdate(
// //       { _id: adminId },
// //       { $push: { storeId: sId } },
// //       { upsert: true, new: true },
// //       (err, doc) => {
// //         if (err) {
// //           // eslint-disable-next-line prefer-promise-reject-errors
// //           reject(
// //             `Internal Server error. Cannot add categories reference in menu ${err}`,
// //           );
// //         } else {
// //           resolve(doc);
// //         }
// //       });
// //   });

// // };
// // const addSeller = async (req, res, next) => {

// //   console.log('done');
// //   try {
// //     const {
// //       firstName,
// //       lastName,
// //       email,
// //       password,
// //       Address,
// //       city,
// //       Telephone,
// //       shopType,
// //       shopName,

// //     } = req.body;
// //     const query = { email };

// //     SellerSchema.findOne(query)
// //       .then(async (user) => {
// //         if (user) {
// //           if (user.email == email) {
// //             res.status(400);
// //             next(new Error('Email Already Taken.'));
// //           }
// //         } else {
// //           bcryptjs.hash(password, 12).then(async (hashedpassword) => {
// //             const product = await SellerSchema({
// //               firstName,
// //               lastName,
// //               email,
// //               password: hashedpassword,
// //               Address,
// //               city,
// //               Telephone,



// //               // eslint-disable-next-line no-underscore-dangle
// //               addedByAdmin: req.user._id
// //             });
// //             //  console.log('product', product);
// //             product
// //               .save()

// //               .then(async cmnt => {
// //                 const store = await StoreScehma({
// //                   shopName,
// //                   shopType,



// //                   // eslint-disable-next-line no-underscore-dangle
// //                   adminId: cmnt._id
// //                 });
// //                 //  console.log('product', product);
// //                 store
// //                   .save().then(storeInfo => {
// //                     addstoreRefToAdmin(cmnt._id, storeInfo._id);
// //                     StoreScehma.findOne({ _id: storeInfo._id })
// //                       .populate('adminId', 'firstName lastName');
// //                     if (storeInfo) {
// //                       res.status(status.OK).send({
// //                         savedItem: storeInfo,
// //                         adminInfo: cmnt,
// //                         Message: 'Store created Created Successfully',
// //                         type: status.Ok,
// //                       });
// //                     }
// //                   })
// //                   .catch(err => {
// //                     res.status(status.INTERNAL_SERVER_ERROR).send({
// //                       Message: 'Can not send saved Item ',
// //                       err,
// //                     });
// //                     console.log('err', err);
// //                   });
// //               }).catch(err => {
// //                 res.status(status.INTERNAL_SERVER_ERROR).send({
// //                   Message: 'Can not send saved Item ',
// //                   err,
// //                 });
// //                 console.log('err', err);
// //               });
// //           })
// //             .catch((err) => {
// //               res.status(500);
// //               next(new Error(err));
// //             });
// //         }
// //       })

// //       .catch((err) => {
// //         res.status(500);
// //         next(new Error(err));
// //       });


// //   } catch (error) {
// //     res.status(status.INTERNAL_SERVER_ERROR).send({
// //       Message: 'Can not get into add seller',
// //       error,
// //     });
// //   }












// // };


// // const deletestoreReffromAdmin = (adminId) => {
// //   return new Promise((resolve, reject) => {
// //     SellerSchema.findOne({ _id: adminId }).then(menu => {
// //       if (menu) {
// //         if (menu.storeId.length > 0) {
// //           StoreScehma.deleteMany({
// //             _id: {
// //               $in: menu.storeId
// //             }
// //           }).then(doc => {
// //             resolve(doc);
// //           })
// //             .catch(err => {
// //               // eslint-disable-next-line prefer-promise-reject-errors
// //               reject('Internal Server error!Cannot remove Items', err);
// //             });
// //         }
// //         else {
// //           resolve();
// //         }
// //       } else {
// //         // eslint-disable-next-line prefer-promise-reject-errors
// //         reject('Internal Server error! cannot find menu');
// //       }
// //     })
// //       .catch(err => {
// //         // eslint-disable-next-line prefer-promise-reject-errors
// //         reject('Internal Server error!Cannot find menu', err);
// //       });
// //   });
// // };

// // const deleteSeller = async (req, res) => {
// //   const { id } = req.params;

// //   // eslint-disable-next-line no-unused-vars
// //   deletestoreReffromAdmin(id).then(msg => {
// //     SellerSchema.findByIdAndRemove(id, (err, result) => {

// //       if (result) {
// //         res.status(status.OK).send({
// //           Message: 'Admin Deleted Successfully.',
// //         });
// //       } else {
// //         res.status(status.INTERNAL_SERVER_ERROR).send({
// //           Message: 'Unable to Delete.',
// //           err,
// //         });
// //       }
// //     });
// //   })
// //     .catch(error => {
// //       res.status(status.INTERNAL_SERVER_ERROR).send({
// //         Message: 'Unable to Delete.',
// //         error,
// //       });
// //     });
// // };






// // const getSingleSeller = (req, res) => {
// //   const { eid } = req.params;

// //   SellerSchema.findOne({ _id: eid })
// //     .then(event => {
// //       if (!event) {
// //         return res.status(status.NOT_FOUND).send({
// //           Message: 'Seller not found',
// //         });
// //       }
// //       return res.status(status.OK).send(event);
// //     })
// //     .catch(err => {
// //       return res.status(status.INTERNAL_SERVER_ERROR).send({
// //         Message: 'Internal Server Error',
// //         err,
// //       });
// //     });
// // };

// // const mediaUpload = async (req, res) => {
// //   // const file =req.body;
// //   console.log(req.file);
// //   if (req.file !== undefined) {
// //     await awsHandler
// //       .UploadToAws(req.file)
// //       .then(async imageUrl => {
// //         res.status(status.OK).send(imageUrl);
// //         console.log(imageUrl);

// //       }).catch(err => {
// //         res.status(status.INTERNAL_SERVER_ERROR).send({
// //           Message: 'Internal Server Error',
// //           err,
// //         });
// //         console.log(err);

// //       });
// //   }else{
// //     res.status(status.BAD_REQUEST).send({
// //       Message: 'Image is required',

// //     });
// //   };

// // };


// export default {  };
