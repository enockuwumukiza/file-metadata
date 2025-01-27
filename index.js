var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer = require('multer');

var app = express();

var storage = multer.memoryStorage();
var upload = multer({storage}).single('upfile');

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload, (req,res) =>{
  
  const file = req?.file;

  if(file){

    const fileMetadata = {
      name:req?.file?.originalname,
      type:req?.file?.mimetype,
      size:req?.file?.size
    }

    res.send(fileMetadata);

    console.log('file submitted');

  }else{
    console.log('no file')
  }


})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
