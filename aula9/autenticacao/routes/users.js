var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/login', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  console.log("Na callback do GET login...")
  console.log(req.sessionID)
  res.render('login',{d: data})
});

router.get('/logout', function(req, res, next) {
  console.log("Na callback do GET logout...")
  req.logout( function(err) {
    if(err)
      res.render('erro',{error: err})
    else
      res.redirect('/')
  })
});

router.post('/login', passport.authenticate('local'),
function(req, res) {
  console.log("Na callback do POST login...")
  console.log("Auth: " + JSON.stringify(req.user))
  res.redirect('/protected')
});

module.exports = router;
