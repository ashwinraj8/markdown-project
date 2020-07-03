const express = require('express')
const mongoose = require('mongoose')

const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
let session = require('express-session');
let passport = require('passport');
let user = require('./routes/users');
let contact = require('./routes/contact');
let publish  = require('./routes/publish');
let idea = require('./routes/idea');

const app = express()

require('./config/passport')(passport);
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
//Passport config
//'mongodb://localhost/blog'
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(()=> console.log("database connected")
).catch((e)=>{
    console.log(e);
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// app.get('/', async (req, res) => {
//   const articles = await Article.find().sort({ createdAt: 'desc' })
//   res.render('articles/index', { articles: articles })
// })

//Routes 
app.get('/login',(req,res)=>{
  res.render('login');
});
app.use('/', require('./routes/index.js'));
app.use('/users', user);

app.use('/articles', articleRouter)
app.use('/contact',contact);
app.use('/publish',publish);
app.use('/ideas',idea)

app.listen(5000, console.log(`Server at 5000`));