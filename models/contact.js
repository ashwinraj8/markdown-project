const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const ContactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  message:{
    type:String
  },
  
  date: {
    type: Date,
    default: Date.now
  },
  
},
 
);


const Contact = mongoose.model('contact', ContactSchema);

module.exports = Contact;