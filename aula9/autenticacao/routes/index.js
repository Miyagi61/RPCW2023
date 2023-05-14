var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  console.log("Na callback da página principal...")
  console.log("Sessão: " + req.sessionID)

  if(req.user)
    res.render('index', {d: data});
  else
    res.render('index', {d: data, u: req.user});
});

function verificaAutenticacao(req, res, next) {
  console.log("User (verif.): " + JSON.stringify(req.user))
  if(req.isAuthenticated()) {
    console.log("Autenticado...")
    next()
  }
  else {
    console.log("Não autenticado...")
    res.redirect('/users/login')
  }
}

router.get('/protected', verificaAutenticacao , function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  res.render("protected", {d: data, u: req.user})
});
module.exports = router;
