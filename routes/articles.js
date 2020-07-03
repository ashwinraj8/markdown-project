const express = require('express')
const Article = require('./../models/article')
let {imgD} = require('../config/imgDislpay');
const AWS = require('aws-sdk');


const router = express.Router()

// router.get('/success',async (req, res) => {
//   const articles = await Article.find().sort({ createdAt: 'desc' })
//   res.render('articles/index', { articles: articles })
// })
///************** */
AWS.config.update({
  accessKeyId: "AKIAINJJHM63CPUTC4DA",
  secretAccessKey: "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"
});
let s3 = new AWS.S3();

function encode(data){
    let buf = Buffer.from(data);
    let base64 = buf.toString('base64');
    return base64
}

///////////////////////////////////////

router.get('/personal',async (req, res) => {
  let e = req.user.email;
  const articles = await Article.find({ email:e}).sort({ createdAt: 'desc' })

  ////////////////////////////////////
  async function getImage(){
    const data =  s3.getObject(
    {
        Bucket: 'azz-bucket',
        Key: 'eeeee'  //Here to pass articlee.id or articles.name;
        }
    
    ).promise();
    return data;
}

  //////////////////////////////////

  getImage()
        .then((img)=>{
           // let image="<img src='data:image/jpeg;base64," + encode(img.Body) + "'" + "/>";
            let image_1="data:image/jpeg;base64," + encode(img.Body);
            //console.log(image_1);
           // let startHTML="<html><body></body>";
            //let endHTML="</body></html>";
            //let html=startHTML + image + endHTML;
            //res.render('home', {name:image_1}); 
            res.render('articles/myArticles', { articles: articles,name:image_1});
            console.log(articles);
           // res.send(html)
        }).catch((e)=>{
            res.send(e)
        })
  
  
  
})

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
})

router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article: article})
  
})

router.get('/:slug', async (req, res) => {

  console.log('in show with slug')
  const article = await Article.findOne({ slug: req.params.slug })
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article});
})

router.post('/', async (req, res, next) => {
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  console.log(imgD);
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/success');
})

function saveArticleAndRedirect(path) {


  return async (req, res) => {
    let article = req.article
    article.imgId = 33333333333
    article.email = req.user.email
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    try {
      article = await article.save()
      res.redirect('/success');
      console.log(article);
     // res.redirect(`/articles/${article.slug}`)
    } catch (e) {
      res.render(`articles/${path}`, { article: article })
    }
  }
}

module.exports = router