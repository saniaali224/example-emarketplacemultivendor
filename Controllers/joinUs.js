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
const joinUsForm = (req, res) => {
    const {
        name,
        lastName,
        email,
        phoneNo,
        altPhoneNo,
        address,
        city,
        state,
        businessType,
        answerOne,
        answerTwo,
        date,
        days,
        times,
    } = req.body;

    const event = new Model.JoinUsModel({
        name,
        lastName,
        phoneNo,
        email,
        altPhoneNo,
        address,
        city,
        state,
        businessType,
        answerOne,
        answerTwo,
        date,
        days,
        times,

    });
    event
        .save()
        .then(savedEvent => {
         
            res.status(status.OK).send({
                savedEvent,
                Message: 'join us form saved',
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
const getAllForms = (req, res) => {
    const { skip = 0, limit = 0, sort = '-1' } = req.query;

    Model.JoinUsModel
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
const getSingleComplaint = (req, res) => {
  const { eid } = req.params;

  ComplaintSchema.findOne({ _id: eid })
    .then(event => {
      if (!event) {
        return res.status(status.NOT_FOUND).send({
          Message: 'form not found',
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
const getSingleForm = (req, res) => {
    const { eid } = req.params;

    Model.JoinUsModel.findOne({ _id: eid })
      .then(event => {
        if (!event) {
          return res.status(status.NOT_FOUND).send({
            Message: 'form not found',
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
  const deleteForm = (req, res) => {
    const { id } = req.params;
    Model.JoinUsModel.findByIdAndRemove(id, (err, result) => {
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
export default {joinUsForm,getAllForms,deleteForm,getSingleForm,getlatestForm,getAllComplaints,getSingleComplaint};


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