import status from 'http-status';

import ProductModel from '../Models/productSchema';



const getAllProductsShop = (req, res) => {
    const { skip = 0, limit = 0, sort = '-1' } = req.query;

   ProductModel
        // eslint-disable-next-line no-underscore-dangle
        .find({storeId:req.user.storeId})
        .sort({ _id: sort })
        .skip(Number(skip))
        .limit(Number(limit))
        .then((forms) => {
            res.json({
                skip: Number(skip),
                limit: Number(limit),
                count: Number(forms.length),
                forms,
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

const getDailyProduct = async (req, res) => {



    // today's orders

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const dailyProductCount = await ProductModel.find({
        createdAt: { $gte: startOfToday },
        // eslint-disable-next-line no-underscore-dangle
        adminId: req.user._id,
    }).countDocuments();





    

    


    res.status(status.OK).send({
        dailyProductCount,
        

    });



};
const getWeeklyProduct = async (req, res) => {



    // today's orders

    const date = new Date(new Date() - 7 * 24 * 60 * 60 * 1000);


    const previousDate = date.setHours(0, 0, 0, 0);

    const weeklyProductCount = await ProductModel.find({
        createdAt: { $gte: previousDate },

        // eslint-disable-next-line no-underscore-dangle
        adminId: req.user._id,
    }).countDocuments();





    

    


    res.status(status.OK).send({
        weeklyProductCount,
        

    });



};
const getMonthlyProduct = async (req, res) => {



    const date = new Date(new Date() - 30 * 24 * 60 * 60 * 1000);


    const previousDate = date.setHours(0, 0, 0, 0);

    const monthlyProductCount = await ProductModel.find({
        createdAt: { $gte: previousDate },

        // eslint-disable-next-line no-underscore-dangle
        adminId: req.user._id,
    }).countDocuments();





    

    


    res.status(status.OK).send({
        monthlyProductCount,
        

    });



};
const getYearlyProduct = async (req, res) => {



    const date = new Date(new Date() - 365 * 24 * 60 * 60 * 1000);


    date.setHours(0, 0, 0, 0);

    const yearlyProductCount = await ProductModel.find({
        createdAt: { $gte: date },

        // eslint-disable-next-line no-underscore-dangle
        adminId: req.user._id,
    }).countDocuments();





    

    


    res.status(status.OK).send({
        yearlyProductCount 
        

    });



};
const getSingleProduct = (req, res) => {
    const { eid } = req.params;

    // eslint-disable-next-line no-underscore-dangle
    ProductModel.findOne({ _id: eid, adminId: req.user._id, })
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
const updateProductStatus = (req, res) => {
    const { id } = req.params;
    const query = { $set: req.body };
    console.log(query);
    ProductModel.findByIdAndUpdate(id, query, { new: true }, (err, result) => {
      if (err) {
        res.status(status.INTERNAL_SERVER_ERROR).send({
          Message: 'Unable to Update.',
        });
      } else {
          console.log(result);
        res.status(status.OK).send({
          Message: 'Successfully Updated.',
          result,
        });
      }
    });
  };
  const getTodaysProducts = (req, res) => {
    const { skip = 0, limit = 0, sort = '-1' } = req.query;
    let date = Date.now();
    console.log(date);
    date = new Date(date);
    console.log(date);
    const newDate = date.toDateString();

    ProductModel
        .find({ date: newDate })
        .sort({ _id: sort })
        .skip(Number(skip))
        .limit(Number(limit))
        .then((products) => {
            res.json({
                skip: Number(skip),
                limit: Number(limit),
                count: Number(products.length),
                products,
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
            console.log(err);
        });
};
const getSingleProductClient = (req, res) => {
    const { eid } = req.params;

    // eslint-disable-next-line no-underscore-dangle
    ProductModel.findOne({ _id: eid })
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
const getReturnedProducts = (req, res) => {
    const { skip = 0, limit = 0, sort = '-1' } = req.query;

   ProductModel
        // eslint-disable-next-line no-underscore-dangle
        .find({productStatus:'returned' ,adminId:req.user._id})
        .sort({ _id: sort })
        .skip(Number(skip))
        .limit(Number(limit))
        .then((Rproducts) => {
            res.json({
                skip: Number(skip),
                limit: Number(limit),
                count: Number(Rproducts.length),
                Rproducts,
            });
            console.log(Rproducts);
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
const getRestockedProducts = (req, res) => {
    const { skip = 0, limit = 0, sort = '-1' } = req.query;

   ProductModel
        // eslint-disable-next-line no-underscore-dangle
        .find({productStatus:'restocked',adminId:req.user._id})
        .sort({ _id: sort })
        .skip(Number(skip))
        .limit(Number(limit))
        .then((Rproducts) => {
            res.json({
                skip: Number(skip),
                limit: Number(limit),
                count: Number(Rproducts.length),
                Rproducts,
            });
            console.log(Rproducts);
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
const getOutOfStockedProducts = (req, res) => {
    const { skip = 0, limit = 0, sort = '-1' } = req.query;

   ProductModel
        // eslint-disable-next-line no-underscore-dangle
        .find({productStatus:'out of stock',adminId:req.user._id})
        .sort({ _id: sort })
        .skip(Number(skip))
        .limit(Number(limit))
        .then((Rproducts) => {
            res.json({
                skip: Number(skip),
                limit: Number(limit),
                count: Number(Rproducts.length),
                Rproducts,
            });
            console.log(Rproducts);
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
export default {
  
    getAllProductsShop,
    getDailyProduct,
    getWeeklyProduct,
    getMonthlyProduct,
    getYearlyProduct,
    getSingleProduct,
    updateProductStatus,
    getTodaysProducts,
    getSingleProductClient,
    getReturnedProducts,
    getRestockedProducts,
    getOutOfStockedProducts


};
