let routes = require('express').Router();
//let mongoose = require('mongoose');
let bodyparser = require('body-parser')
let contact = require('../models/contact');
let {ensureAuthenticated,checkAdmin,serializeUser} = require('../config/auth');

routes.use(bodyparser.urlencoded({extended: true}));


///////////////////contact/////////////////////////
routes.post('/', (req,res)=>{
    let ct =  new contact({

        message: req.body.message,
        email : req.body.email,
    })
    ct.save()
    .then(result=>{
        res.send(result);
        console.log(result);
    })
    .catch(err=>{
        console.log(err);
    })
})

routes.get('/',ensureAuthenticated,checkAdmin,(req, res)=> {
    contact.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

routes.delete('/:id',(req,res)=>{
   // data = req.params.id;
   var myquery = { data: req.params.id }; //req.params.id is string type.
    // contact.deleteOne(myquery,(err,obj)=>{
    //     if (err) throw err;
    //     console.log("1 contact deleted");
    //     res.send('1 contact deleted')
    // })
    var uid = req.params.id.toString();
    contact.deleteOne({"_id":uid}, function(err, result) { 
        if (err) throw err;
        console.log("1 contact deleted");
        res.send('1 contact deleted');
    });
})

//////////////////////////contact//////////////////

module.exports = routes;