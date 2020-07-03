let express = require('express');

let router  = express.Router();
let bcrypt = require('bcryptjs');
let User = require('../models/User');
let passport = require('passport');

// //Bring user registration 
// let {userRegister, userLogin,userAuth,serializeUser,checkRole} = require('../utils/Auth');

// //User Registration route
// router.post("/register-user", async(req,res)=>{
//     await userRegister(req.body,"user",res);
// });

// //Admin Registration route
// router.post("/register-admin", async(req,res)=>{
//     await userRegister(req.body,"admin",res);
// });


// //SuperAdmin Registration route
// router.post("/register-super-admin", async(req,res)=>{
//     await userRegister(req.body,"super-admin",res);
// });




// //User Login route
// router.post("/login-user", async(req,res)=>{
//     await userLogin(req.body,"user",res);
// });


//  //Admin Login route
//  router.post("/login-admin", async(req,res)=>{
//     await userLogin(req.body,"admin",res);
//  });


// //Super Admin Login route
// router.post("/login-super-admin", async(req,res)=>{
//     await userLogin(req.body,"superadmin",res);
// });

// //Profile Route
// router.get('/profile',userAuth,async(req,res)=>{

//     //console.log(req.allparams());
    
//    return res.json(serializeUser(req.user));
    
// })



// //User protected route
// router.get("/user-protected",userAuth,checkRole(["user"]), async(req,res)=>{
//     return res.json("hello user");
// });


// //Admin protected route
// router.get("/admin-protected",userAuth,checkRole(["admin"]), async(req,res)=>{
//     return res.json("hello admin");
// });

// router.get("/admin-user-protected",userAuth,checkRole(["admin","user"]), async(req,res)=>{
//     return res.json("hello admin and user");
// });


// //super admin protected route
// router.get("/super-admin-protected",userAuth,checkRole(["superadmin"]), async(req,res)=>{
//     return res.json("hello superadmin");
// });



///******************************* */
router.get('/login',(req,res)=>{
    res.render('login')
})


router.get('/register',(req,res)=>{
    res.render('index');
}),

router.post('/register',(req,res)=>{
    const { email, name, password, password2 } = req.body;
    let errors = [];

    User.findOne({email:email})
    .then(user=>{
        if(user){
            console.log('User exists!');
            res.render('index');
        }
        else{
            let newUser = new User({
                email,
                name,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => {
                      res.redirect('/users/login');
                    })
                    .catch(err => console.log(err));
                });
              });

            console.log(newUser);
        }
    });

})

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/success',
      failureRedirect: '/users/login',
     // failureFlash: true
    })(req, res, next);
  })

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
  });


module.exports = router;