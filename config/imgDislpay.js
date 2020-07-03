const express = require("express");
const router = express.Router();
const AWS = require('aws-sdk');


router.get('/', (req, res)=>{ 

    AWS.config.update({
        accessKeyId: "AKIAINJJHM63CPUTC4DA",
        secretAccessKey: "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"
      });
    let s3 = new AWS.S3();
    async function getImage(){
            const data =  s3.getObject(
            {
                Bucket: 'azz-bucket',
                Key: '1593550982337'
                }
            
            ).promise();
            return data;
        }
    getImage()
        .then((img)=>{
           // let image="<img src='data:image/jpeg;base64," + encode(img.Body) + "'" + "/>";
            let image_1="data:image/jpeg;base64," + encode(img.Body);
            //console.log(image_1);
           // let startHTML="<html><body></body>";
            //let endHTML="</body></html>";
            //let html=startHTML + image + endHTML;
            res.render('home', {name:image_1}); 
           // res.send(html)
        }).catch((e)=>{
            res.send(e)
        })
    function encode(data){
            let buf = Buffer.from(data);
            let base64 = buf.toString('base64');
            return base64
        }


        
   // res.render('home', {name:'Akashdeep'}); 
      
    });
    module.exports = router;