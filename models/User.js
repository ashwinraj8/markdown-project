const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  
  date: {
    type: Date,
    default: Date.now
  },
  points: {
    type:Number,
    default:0
  }
  
},
 {timestamps:true}
);
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User-yo', UserSchema);

module.exports = User;