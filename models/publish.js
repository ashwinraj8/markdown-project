let mongoose = require('mongoose');

let WSchema = mongoose.Schema({

    email:String,
    name:String,
    message: String,
    skills:String,
    createdAt: {
        type: Date,
        default: Date.now
      },
      partener:Array
});

module.exports = mongoose.model('publish',WSchema);