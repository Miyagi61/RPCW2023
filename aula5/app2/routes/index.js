var express = require('express');
var router = express.Router();
var Aluno = require('../controllers/aluno')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16);
  Aluno.list()
    .then(alunos => res.render('index', { slist: alunos, d: data }))
    .catch(error => res.render('error', {error: error}))
});

/* GET Add Form Student page. */
router.get('/alunos/registo', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16);
  res.render('addAlunoForm', { d: data });
});


/* GET STUDENT page. */
router.get('/alunos/:idAluno', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16);
  Aluno.getAluno(req.params.idAluno)
    .then(alunos => res.render('aluno', { a: alunos, d: data }))
    .catch(error => res.render('error', {error: error}))
});

/* POST Add Student Form Data page. */
router.post('/alunos/registo', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16);
  Aluno.addAluno(req.body)
    .then(alunos => res.render('confirmAddAluno', { a: alunos, d: data }))
    .catch(error => res.render('error', {error: error}))
})

/* POST Add Student Form Data page. */
router.post('/alunos/registo', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16);
  Aluno.addAluno(req.body)
    .then(alunos => res.render('confirmAddAluno', { a: alunos, d: data }))
    .catch(error => res.render('error', {error: error}))
})

/* GET Edit Student Form page. */
router.get('/alunos/edit/:idAluno', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16);
  Aluno.getAluno(req.params.idAluno)
    .then(alunos => res.render('editAlunoForm', { a: alunos, d: data }))
    .catch(error => res.render('error', {error: error}))
});

/* POST Edit Student Form Data page. */
router.post('/alunos/edit/:idAluno', function(req, res) {
  var data = new Date().toISOString().substring(0,16);
  Aluno.editAluno(req.body)
    .then(alunos => res.render('confirmUpdateAluno', { a: alunos, d: data }))
    .catch(error => res.render('error', {error: error}))
});


/* GET Delete Student page. */
router.get('/alunos/delete/:idAluno', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16);
  Aluno.deleteAluno(req.params.idAluno)
    .then( () => res.render('deletedAluno', { id: req.params.idAluno , d : data}))
    .catch(error => res.render('error', {error: error}))
});

module.exports = router;
