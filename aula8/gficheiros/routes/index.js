var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var fs = require('fs')

var multer = require('multer');
var upload = multer({dest: 'uploads/'});

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 19);
  jsonfile.readFile(__dirname+"/../data/dbFiles.json",(erro,registos) => {
    if(erro){
      res.render('error',{error:erro})
    }else{
      res.render('index', {files: registos,d:data})
    }
  })
});

router.get('/files/upload', function(req, res) {
  var data = new Date().toISOString().substring(0, 19);
  res.render('fileForm', {d: data});
});

router.post('/files', upload.single('myFile'), function(req, res) { 
  console.log('cdir: ' + __dirname)
  
  let oldPath = __dirname + '/../' + req.file.path
  console.log(oldPath)
  let newPath = __dirname + '/../public/fileStore/' + req.file.originalname
  console.log('new:' + newPath)

  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      res.render('error',{error:erro})
    }
    else{
      var files = jsonfile.readFileSync(__dirname + '/../data/dbFiles.json')
      files.push({
          "name": req.file.originalname,
          "size": req.file.size,
          "date": new Date().toISOString().substring(0, 19),
          "mimetype": req.file.mimetype,
          "desc": req.body.desc
      })

      jsonfile.writeFileSync(__dirname + '/../data/dbFiles.json', files)
      res.redirect('/')
    }
  })
});


router.get('/download/:fname', function(req, res) {
  res.download(__dirname + '/../public/fileStore/' + req.params.fname)
});
module.exports = router;