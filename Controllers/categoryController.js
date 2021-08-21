import status from 'http-status';
// import nodeMailer from 'nodemailer';
// import smtpTransport from 'nodemailer-smtp-transport';
import CategorySchema from '../Models/CategorySchema';
import SubCategorySchema from '../Models/SubcategorySchema';



const createCategory = async (req, res) => {
	try {


		const {
			categoryName
		} = req.body;



		const newOrder = CategorySchema({
			categoryName

		});

		newOrder
			.save()
			.then(async (order) => {
				res.json({ Message: 'Category Added Successfully.', category: order });
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

const getCategory = (req, res) => {
	CategorySchema.find({})
		.then((orders) => {


			res.status(200).json(orders);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
};
const addCategoryRefToSubCategory = (categoryId, SId) => {
	return new Promise((resolve, reject) => {
		// pushing id of comment to Article Model to get the comment by referemnce is articles
		// console.log(categoryId, SId);

		CategorySchema.findOneAndUpdate(
			{ _id: categoryId },
			{ $push: { subCategoryId: SId } },
			{ upsert: true, new: true },
			(err, doc) => {
				if (err) {
					// eslint-disable-next-line prefer-promise-reject-errors
					reject(
						`Internal Server error. Cannot add subcategories reference in category ${err}`,
					);
				} else {
					resolve(doc);
					console.log(doc);

				}
			});
	});

};

const addSubCategory = async (req, res) => {
	const { subCategoryName, categoryId } = req.body;

	const category = new SubCategorySchema({
		subCategoryName,
		categoryId,
		// eslint-disable-next-line no-underscore-dangle

	});
	await category
		.save()
		.then(async savedEvent => {
			// eslint-disable-next-line no-underscore-dangle
			await addCategoryRefToSubCategory(categoryId, savedEvent._id);
			// eslint-disable-next-line no-underscore-dangle
			// console.log('cateoryId', categoryId, 'savedId', savedEvent._id);

			// eslint-disable-next-line no-underscore-dangle
			SubCategorySchema.findOne({ _id: savedEvent._id })
				.populate('categoryId', 'categoryName')
				.then(async cmnt => {
					if (cmnt) {
						console.log(cmnt);

						await res.status(status.OK).send({
							savedCategory: cmnt,
							Message: 'Category Created Successfully',

						});
					}
				})
				.catch(err => {
					res.status(status.INTERNAL_SERVER_ERROR).send({
						Message: 'Can not send saved Item ',
						err,
					});
					// console.log('err', err);
				});

		})
		.catch(err => {
			res.status(status.INTERNAL_SERVER_ERROR).send({
				Message: status.INTERNAL_SERVER_ERROR,
				err,
			});
		});
};


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


const getSingleCategory = (req, res) => {
	const { eid } = req.params;

	CategorySchema.findOne({ _id: eid })
	.populate('subCategoryId', 'subCategoryName')
		.then(event => {
			if (!event) {
				return res.status(status.NOT_FOUND).send({
					Message: 'category not found',
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
const deleteCategoryReffromSubCategory = (menuId) => {
	return new Promise((resolve, reject) => {
		CategorySchema.findOne({ _id: menuId }).then(menu => {
			if (menu) {
				if (menu.subCategoryId.length > 0) {
					SubCategorySchema.deleteMany({
						_id: {
							$in: menu.categoryId
						}
					}).then(doc => {
						resolve(doc);
					})
						.catch(err => {
							// eslint-disable-next-line prefer-promise-reject-errors
							reject('Internal Server error!Cannot remove Items', err);
						});
				}
				else {
					resolve();
				}
			} else {
				// eslint-disable-next-line prefer-promise-reject-errors
				reject('Internal Server error! cannot find Category');
			}
		})
			.catch(err => {
				// eslint-disable-next-line prefer-promise-reject-errors
				reject('Internal Server error!Cannot find Category', err);
			});
	});                                   
};
const deleteCategory = (req, res) => {
	const { id } = req.params;
	// eslint-disable-next-line no-unused-vars
	deleteCategoryReffromSubCategory(id).then(msg => {
		CategorySchema.findByIdAndRemove(id, (err, result) => {
			if (result) {
				res.status(status.OK).send({
					Message: 'Category Deleted Successfully.',
				});
			} else {
				res.status(status.INTERNAL_SERVER_ERROR).send({
					Message: 'Unable to Delete.',
					err,

				});
			}
		});
	})
		.catch(error => {
			res.status(status.INTERNAL_SERVER_ERROR).send({
				Message: 'Unable to Delete.',
				error,
			});
		});
};

export default {
	createCategory,
	getCategory,
	getSingleCategory,
	addSubCategory,
	deleteCategory



};
