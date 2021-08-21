import status from 'http-status';
// import nodeMailer from 'nodemailer';
// import smtpTransport from 'nodemailer-smtp-transport';
import Model from '../Models/Model';
import ComplaintSchema from '../Models/complaintsSchema';
/**
 * join us form being saved to the database.
 * @param {*} req 
 * @param {*} res 
 */
const review = (req, res) => {
    const {
        productImage,
        // eslint-disable-next-line no-unused-vars
        userId,
        userName,
        productId,
        stars
    } = req.body;

    const event = new Model.ReviewModel({
      productImage,
      // eslint-disable-next-line no-underscore-dangle
      userId:req.user._id,
      userName,
      productId,
      stars

    });
    event
        .save()
        .then(savedEvent => {
         
            res.status(status.OK).send({
                savedEvent,
                Message: 'review saved',
                type: status.Ok,
            });

        })
        .catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).send({
                Message: 'could not save join us form please try again',
                err,
            });
        }).catch(err => {
            res.status(500).send(err);
        });
};
/**
 * fetches all join us forms
 * @param {*} req 
 * @param {*} res 
 */
const getAllReview = (req, res) => {
    const { skip = 0, limit = 0, sort = '-1' } = req.query;

    Model.ReviewModel
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
/**
 * fetches all join us forms
 * @param {*} req 
 * @param {*} res 
 */
const getlatestForm = (req, res) => {
  const { skip = 0, limit = 0, sort = '-1' } = req.query;

  Model.JoinUsModel
      .find({requestStatus:'pending'})
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
/**
 * fetches all join us forms
 * @param {*} req 
 * @param {*} res 
 */
const getAllComplaints = (req, res) => {
  const { skip = 0, limit = 0, sort = '-1' } = req.query;

  ComplaintSchema
      .find({})
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

export default {review,getAllReview,getlatestForm,getAllComplaints};


// const transporter = nodeMailer.createTransport(smtpTransport({
//   host: 'smtp.gmail.com',
//   secure: true,
//   port: 465,
//   tls: {
//     rejectUnauthorized: false
//   },
//   greetingTimeout : 1000 * (45),
//   auth: {
//     user: 'argentavisstore@gmail.com',
//     pass: 'argentavisteam'
//   },

//   // debug: true, // show debug output
//   logger: true // log information in console
// }));
// const mailOptions = {
//   from: 'argentavisstore@gmail.com',
//   to: savedEvent.address,
//   subject: 'Appointment Details Argentavis Store',
//   html: `<b>name</b>:${name}<br><br> <b>Last name</b>:${lastName}<br><br> <b>Number</b>:${phoneNo}<br><br> <b>email</b>:${address}<br><br><b>Successfully Appointed</b>`,
// };
// console.log(mailOptions);
// // eslint-disable-next-line func-names
// transporter.verify(function (error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Server is ready to take our messages', success);
//   }
// });


// // eslint-disable-next-line func-names
// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) console.log(error);
//   else console.log(`Message sent successfully: ${info.response}`);
// });