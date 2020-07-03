let express = require('express');
const publish = require('./../models/publish')



//Middlewares
let {ensureAuthenticated,checkAdmin,serializeUser} = require('../config/auth');
const { route } = require('./users');

let router  = express.Router();





router.get('/',ensureAuthenticated,async (req, res) => {
   
    const Publish = await publish.find().sort({ createdAt: 'desc' })
    const admin = req.user.isAdmin;
    console.log(admin);
    res.render('articles/ideas', { Publish: Publish, admin:admin })
  })
  router.get('/response',async (req, res) => {
    let e = req.user.email;
    const Publish = await publish.find({ email:e})
    
    //res.render('articles/myArticles', { articles: articles})
    res.send(Publish);
   
  })

  router.get('/:id', async (req, res) => {
    console.log('in show with id')
    //const Publish = await publish.findOne({ _id: req.params.id })
   // if (Publish == null) res.redirect('/')
   publish.updateOne(
      { _id: req.params.id },
      { $addToSet: { partener: ["email :" + req.user.email+" "+"name: "+ req.user.name] } },
      function(err, result) {
        if (err) {
          res.send(err);
        } else {

          
          res.send('You have requested to join this project').json;
        }
      }
    );
    // res.render('articles/show', { article: article })
   // res.send('Yehh in show of publish')
  })

  router.get('/part/:id', async (req, res) => {
    console.log('in show with particularid')
    const Publish = await publish.findOne({ _id: req.params.id })
    res.send(Publish);
    // res.render('articles/show', { article: article })
   // res.send('Yehh in show of publish')
  })

  module.exports = router;