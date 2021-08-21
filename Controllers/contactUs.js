import status from 'http-status';
import Model from '../Models/Model';
/**
 * add contact us Form being saved to the database
 * @param {*} req 
 * @param {*} res 
 */
const contactUsForm = (req, res) => {
    const {
        name,
        email,
        message
    } = req.body;

    const event = new Model.ContactUsModel({
      name,
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
/**
 * fetches all the items
 * @param {*} req 
 * @param {*} res 
 */
const getAllForms = (req, res) => {
    const { skip = 0, limit = 0, sort = '-1' } = req.query;

    Model.ContactUsModel
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
const getSingleForm = (req, res) => {
    const { eid } = req.params;

    Model.ContactUsModel.findOne({ _id: eid })
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
    Model.ContactUsModel.findByIdAndRemove(id, (err, result) => {
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
export default {contactUsForm,getAllForms, getSingleForm, deleteForm};