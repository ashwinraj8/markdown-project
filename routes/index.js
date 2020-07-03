let express = require('express');
const Article = require('./../models/article')



//Middlewares
let {ensureAuthenticated,checkAdmin,serializeUser} = require('../config/auth');
const { route } = require('./users');

let router  = express.Router();

router.get('/',(req,res)=>{
    //console.log(req.user);
    //res.send('in index route')
    res.render('index')
})

 
router.get('/success',ensureAuthenticated,async (req, res) => {
    console.log(req.user);
    const articles = await Article.find().sort({ createdAt: 'desc' })
    const admin = req.user.isAdmin;
    console.log(admin);
    res.render('articles/index', { articles: articles, admin:admin })
  })



  

router.get('/admin',ensureAuthenticated,checkAdmin,(req,res)=>{
    res.render('adminsuccess',{data: `Hello Admin ${req.user.name}`});
})




module.exports = router;