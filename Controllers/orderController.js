import status from 'http-status';
import nodeMailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import OrderModel from '../Models/orderSchema';
import ShipmentModel from '../Models/shipmentSchema';
import ComplaintModel from '../Models/complaintsSchema';
import ReturnModel from '../Models/returnOrderSchema';


const createOrder = async (req, res) => {
    try {


        const {
            orderItems,
            address,
            postalCode,
            phone,
            userEmail,
            userFirstName,
            userLastName,
            userId,
            PaymentMethod,
            totalPrice,
            Deliverymode
        } = req.body;



        const newOrder = OrderModel({
            orderItems,
            postalCode,
            address,
            phone,
            userEmail,
            userFirstName,
            userLastName,
            userId,
            PaymentMethod,
            totalPrice,
            Deliverymode

        });

        newOrder
            .save()
            .then(async (order) => {
                const ship = await ShipmentModel({
                    postalCode,
                    address,
                    phone,
                    userEmail,
                    userFirstName,
                    userLastName,
                    userId: order.userId,
                });
                ship.save()
                    .then(async (ships) => {
                        const transporter = nodeMailer.createTransport(smtpTransport({
                            host: 'smtp.gmail.com',
                            secure: true,
                            port: 465,
                            tls: {
                              rejectUnauthorized: false
                            },
                            greetingTimeout : 1000 * (60),
                            auth: {
                              user: 'argentavisstore@gmail.com',
                              pass: 'argentavisteam'
                            },
                      
                            // debug: true, // show debug output
                            logger: true // log information in console
                          }));
                          const Link = 'https://admin.argentavisstore.com/';
                          const mailOptions = {
                            from: 'argentavisstore@gmail.com',
                            to: order.userEmail,
                            cc: 'argentavisstore@gmail.com',
                            subject: 'Order Details Argentavis Store',
                            html: `<b>name</b>:${userFirstName}<br><br> <b>Last name</b>:${userLastName}<br><br> <b>Number</b>:${phone}<br><br> <b>email</b>:${address}<br><br><b>You have Successfully ordered from Argentavis store  </b><br><br><b>Go To your dashboard For order details ${Link} </b>`,
                          };
                          console.log(mailOptions);
                          // eslint-disable-next-line func-names
                          transporter.verify(function (error, success) {
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Server is ready to take our messages', success);
                            }
                          });
                      
                      
                          // eslint-disable-next-line func-names
                          transporter.sendMail(mailOptions, function (error, info) {
                            if (error) console.log(error);
                            else console.log(`Message sent successfully: ${info.response}`);
                          });
                        res.json({ Message: 'Order Placed Successfully.', orders: order, shipping: ships });
                    }).catch((err) => {
                        res.json({ err, Message: 'Unable To save shipment' });
                    });
            })
            .catch((err) => {
                res.json({ err, Message: 'Unable To Place Order' });
            });
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({
            Message: 'Can not get into add seller',
            error,
        });
    }
};

// const getOrders = (req, res) => {
//   OrderModel.find({})
//     .then((orders) => {
//       const finalArray = [];
//       let statuss = false;
//       if (orders.length > 0) {
//         orders.map((el) => {
//           statuss = false;
//           if (el.orderItems.length > 0) {
//             el.orderItems.map((item) => {
//               if (statuss == true) {
//                 // do nothing
//               } else {
//                 if (item.sellerId == req.seller.id) {
//                   finalArray.push(el);
//                   statuss = true;
//                 }
//               }
//             });
//           }
//         });
//       }
//       res.status(200).json(orders);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// };
// const imageupdate = async (req, res) => {
//   try {
//     const imagesArray = [];
//     if (req.files.length > 0) {
//       req.files.map((file, index) => {
//         awsHandler.UploadToAws(file).then(async (imageUrl) => {
//           imagesArray.push(imageUrl);
//           if (req.files.length === imagesArray.length) {
//             console.log(imagesArray);

//             const data = {
//               image: imagesArray,
//             };

//             const product = await productModel.findByIdAndUpdate(
//               req.params.productid,
//               { $set: data },
//               { new: true }
//             );
//             if (!product) {
//               return res.status(404).json({
//                 errors: [{ message: "No Product Found. Invalid ID" }],
//               });
//             }
//             return res.json({ product, message: "Product Updated!" });
//           }
//         });
//       });
//     }
//   } catch (err) {
//     if (err.name === "CastError") {
//       return res
//         .status(404)
//         .json({ errors: [{ message: "No Product Found" }] });
//     }
//     return res.status(500).json({ errors: [{ message: err.message }] });
//   }
// };
// const getorderById = (req, res) => {
//   // const orderid=req.params.id;
//   console.log(req.params.id);
//   OrderModel.find({ _id: req.params.id })
//     .populate("warehouseId", "address")
//     .populate("transactionId")
//     .exec(function (err, order) {
//       if (err) {
//         res.json({ Message: "Internal Server Error.", err });
//       } else {
//         const finalArray = [];
//         let statuss = false;
//         if (order.length > 0) {
//           order.map((el) => {
//             statuss = false;
//             if (el.orderItems.length > 0) {
//               el.orderItems.map((item) => {
//                 if (statuss == true) {
//                   // do nothing
//                 } else {
//                   if (item.sellerId == req.seller.id) {
//                     finalArray.push(el);
//                     statuss = true;
//                   }
//                 }
//               });
//             }
//           });
//         }
//         console.log(order);
//         res.json(order);
//       }
//     });
// };
// const updateOrder = (req, res) => {
//   const { sid } = req.params;
//   const query = { $set: req.body };
//   OrderModel.findByIdAndUpdate(sid, query, { new: true })

//     .then((order) => {
//       res.json({ order, Message: "orderStatus Updated Successfully." });
//     })
//     .catch((err) => {
//       res.json({
//         err,
//         Message: "Unable to Update At the Moment.",
//       });
//     });
// };
// const getdeliveredorder = (req, res) => {
//   OrderModel.find({
//     $or: [{ orderStatus: "cancelled" }, { orderStatus: "delivered" }],
//   })
//     .then((order) => {
//       const finalArray = [];
//       let statuss = false;
//       if (order.length > 0) {
//         order.map((el) => {
//           statuss = false;
//           if (el.orderItems.length > 0) {
//             el.orderItems.map((item) => {
//               if (statuss == true) {
//                 // do nothing
//               } else {
//                 if (item.sellerId == req.seller.id) {
//                   finalArray.push(el);
//                   statuss = true;
//                 }
//               }
//             });
//           }
//         });
//       }
//       res.json({
//         order,
//       });
//     })
//     .catch((err) => {
//       res.json({ Message: "Internal Server Error.", err });
//     });
// };
// const getprocessingorder = (req, res) => {
//   OrderModel.find({
//     $or: [{ orderStatus: "un paid" }, { orderStatus: "processing" }],
//   })
//     .then((order) => {
//       const finalArray = [];
//       let statuss = false;
//       if (order.length > 0) {
//         order.map((el) => {
//           statuss = false;
//           if (el.orderItems.length > 0) {
//             el.orderItems.map((item) => {
//               if (statuss == true) {
//                 // do nothing
//               } else {
//                 if (item.sellerId == req.seller.id) {
//                   finalArray.push(el);
//                   statuss = true;
//                 }
//               }
//             });
//           }
//         });
//       }
//       res.json({
//         order,
//       });
//     })
//     .catch((err) => {
//       res.json({ Message: "Internal Server Error.", err });
//     });
// };
// const getsellerpublic = async (req, res) => {
//   SellerModel.find()
//     .then((seller) => {
//       res.json({
//         seller,
//       });
//     })
//     .catch((err) => {
//       res.json({
//         Message: "No user Founds.",
//         err,
//       });
//     });
// };

// const getOrderByIdForUser = async (req, res) => {
//   OrderModel.find({ _id: req.params.id })
//     .populate("transactionId")
//     .then((order) => {
//       res.json(order[0]);
//     })
//     .catch((err) => {
//       res.json({ Message: "Internal Server Error.", err });
//     });
// };
const getOrders = (req, res) => {
	OrderModel.find({})
		.then((orders) => {


			res.status(200).json(orders);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
};
const getuserorderById = (req, res) => {
    // const orderid=req.params.id;

    // eslint-disable-next-line no-underscore-dangle
    OrderModel.find({ $and: [{ userId: req.user._id }, { orderStatus: 'processing' }] })
        .then((order) => {

            res.json(order);
        })
        .catch((err) => {
            res.json({ Message: 'Internal Server Error.', err });
        });
};

const getAlluserorderById = (req, res) => {
    // const orderid=req.params.id;

    // eslint-disable-next-line no-underscore-dangle
    OrderModel.find({ userId: req.user._id  }, { orderStatus: 'delivered' })
        .then((order) => {

            res.json(order);
        })
        .catch((err) => {
            res.json({ Message: 'Internal Server Error.', err });
        });
};
const complaintUser = (req, res) => {
    const {
        firstName,
        email,
        message
    } = req.body;

    const event = new ComplaintModel({
      firstName,
      email,
      message

    });
    event
        .save()
        .then(savedEvent => {
            res.status(status.OK).send({
                savedEvent,
                Message: 'contact form saved',
                type: status.Ok,
            });

        })
        .catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).send({
                Message: 'could not save contact us form please try again',
                err,
            });
        }).catch(err => {
            res.status(500).send(err);
        });
};

const returnOrderUser = (req, res) => {
    const {
        firstName,
        email,
        productNumber,
        storeName,
        message
    } = req.body;

    const event = new ReturnModel({
      firstName,
      email,
      productNumber,
      storeName,
      message

    });
    event
        .save()
        .then(savedEvent => {
            res.status(status.OK).send({
                savedEvent,
                Message: 'contact form saved',
                type: status.Ok,
            });

        })
        .catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).send({
                Message: 'could not save contact us form please try again',
                err,
            });
        }).catch(err => {
            res.status(500).send(err);
        });
};
const updateOrderStatus = (req, res) => {
    const { id } = req.params;
    const query = { $set: req.body };
    OrderModel.findByIdAndUpdate(id, query, { new: true }, (err, result) => {
      if (err) {
        res.status(status.INTERNAL_SERVER_ERROR).send({
          Message: 'Unable to Update.',
        });
      } else {
        res.status(status.OK).send({
          Message: 'Successfully Updated.',
          result,
        });
      }
    });
  };
 const getSingleOrder = (req, res) => {
    const { eid } = req.params;

    // eslint-disable-next-line no-underscore-dangle
    OrderModel.findOne({ _id: eid, adminId: req.user._id, })
        .then(event => {
                                                                                            
            // console.log(event);
            if (!event) {
                return res.status(status.NOT_FOUND).send({
                    Message: 'No Product exist',
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

export default {
    createOrder,
    getuserorderById,
    getAlluserorderById,
    complaintUser,
    returnOrderUser ,
    updateOrderStatus,
    getSingleOrder,
    getOrders

};
