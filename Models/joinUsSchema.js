import mongoose from 'mongoose';

const JoinUsSchema = new mongoose.Schema({
  
    name: {
        type: String,
        required: [true, 'please provide your name.']
    },
    email: {
        type: String,
        default:''
    },
    lastName: {
        type: String,
        required: [true, 'please provide your last name.'],
    },
    phoneNo: {
        type: String,
        required: [true, 'please provide your phone number.']
    },
    altPhoneNo: {
        type: String,
        default:'none'
    },
    address: {
        type: String,
        required: [true, 'please provide your address.']
    },
    city: {
        type: String,
        required: [true, 'please provide your city.']
    },
    state: {
        type: String,
        required: [true, 'please provide your state.']
    },
    businessType: {
        type: Array,
        default:[],
        required: [true, 'please provide your business type.']
    },
    answerOne: {
        type: String,
        required: [true, 'please provide with an answer.']
    },
    answerTwo: {
        type: String,
        required: [true, 'please provide with an answer.']
    },
    date:{
        type:String,
        default: Date.now()
    },
    requestStatus: {
        type: String,
        default: 'pending',
    },
    days:String,
    times:String
    

},
    { timestamps: true }
);
export default mongoose.model('joinUs', JoinUsSchema);