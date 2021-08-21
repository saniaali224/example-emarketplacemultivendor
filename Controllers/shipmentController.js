import status from 'http-status';
import ShipmentModel from '../Models/shipmentSchema';







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

const getusershipmentById = (req, res) => {
    // const orderid=req.params.id;

    // eslint-disable-next-line no-underscore-dangle
    ShipmentModel.find({ userId: req.user._id } )
        .then((shipment) => {

            res.json(shipment);
        })
        .catch((err) => {
            res.json({ Message: 'Internal Server Error.', err });
        });
};
const deleteShipment = (req, res) => {
    const { id } = req.params;

    ShipmentModel.findByIdAndRemove(id, (err, result) => {
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

export default {
    getusershipmentById,
    deleteShipment

};
