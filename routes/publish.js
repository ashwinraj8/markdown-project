let routes = require('express').Router();
let bodyparser = require('body-parser')
let publish = require('../models/publish');
const router = require('./users');
const aws = require('aws-sdk');

const multer = require('multer');
const multerS3 = require('multer-s3');
let {ensureAuthenticated,checkAdmin,serializeUser} = require('../config/auth');

routes.use(bodyparser.urlencoded({extended: false}));

//////////////////////////////////////////////////////
aws.config.update({
  secretAccessKey: 'GdeD6mA47xaonsTfLONexpqBsSI6PUALd0Rtkp6z',
  accessKeyId: 'AKIAINJJHM63CPUTC4DA',
  region:'ap-south-1'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
  } else {
      cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
}

/////////////////////////////////////////////////////////////

routes.get('/',ensureAuthenticated,(req,res)=>{
  res.render('articles/publish');
})


routes.post('/', (req,res)=>{

 

    let {name,message,skills} = req.body;
    console.log(req.body);

    /////////////////////////////////////////////////////////////////
    const upload = multer({
      fileFilter,
      storage: multerS3({
        s3,
        bucket: 'azz-bucket',
        //acl: 'public-read',
        metadata: function (req, file, cb) {
          cb(null, {fieldName: 'TESTING_META_DATA!'});
        },
        key: function (req, file, cb) {
          cb(null,'latest_test_1')//Date.now().toString())
        }
      })
    })

    const singleUpload = upload.single('image');

    singleUpload(req, res, function(err) {

    if (err) {
      return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
    }

   // return res.json({'imageUrl': req.file.location});
  //  let  email  = req.user.email;
  //         publish({
  //             name,message,skills,email
  //           }).save()
  //           .then(result=>{
               
  //               res.render('articles/publish')
  //               console.log(result);
  //           })
  //           .catch(err=>{
  //               console.log(err);
  //           })
    });

    let  email  = req.user.email;
    publish({
        name,message,skills,email
      }).save()
      .then(result=>{
         
          res.render('articles/publish')
          console.log(result);
      })
      .catch(err=>{
          console.log(err);
      })

    
    
    ///////////////////////////////////////////////////////////////////

    //  let  email  = req.user.email;
    //       publish({
    //           name,message,skills,email
    //         }).save()
    //         .then(result=>{
               
    //             res.render('articles/publish')
    //             console.log(result);
    //         })
    //         .catch(err=>{
    //             console.log(err);
    //         })
      
})
  
  routes.get('/:id',(req, res)=> {
    publish.find(
        { "_id":req.params.id},
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.status(200).json(result);
            console.log(result);
          }
        }
      );
  });

  routes.delete('/:id',(req,res)=>{
      let y = req.params.id;
      console.log(typeof(y));
     var uid = req.params.id.toString();
     publish.deleteOne({"_id":uid}, function(err, result) { 
         if (err) throw err;
         console.log("1 workout deleted");
         res.send('1 workout deleted');
     });
 })
 routes.put('/:id',(req,res)=>{

   
     var uid = req.params.id;
     let val = req.body.equip;
     publish.findOneAndUpdate({"_id":uid}, {$set:{equip:val}}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        
        res.send(doc);
        console.log(val);
    });


 })
 
 module.exports = routes;
