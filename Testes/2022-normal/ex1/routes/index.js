var express = require('express');
var router = express.Router();
var Exame = require('../controllers/cidades')

/* GET home page. */
router.get('/emd', function(req, res, next) {
  Exame.list()
    .then(exames => {
      res.status(200).json(exames)
    })
    .catch(erro => {
      res.status(520).json({error: erro, message: "Erro na obtenção da lista de exames"})
    })
});

/* GET exame by id */
router.get('/emd/:id', function(req, res, next) {
  Exame.getExame(req.params.id)
    .then(exame => {
      res.status(200).json(exame)
    })
    .catch(erro => {
      res.status(521).json({error: erro, message: "Erro na obtenção de um exame"})
    })
});


/* POST exame */
router.post('/emd', (req, res) => {
  console.dir(req.body)
  Exame.addExame(req.body)  
    .then(exame => {
      res.status(201).json(exame)
    })
    .catch(erro => {
      res.status(522).json({error: erro, message: "Erro na inserção de um exame"})
    })
});

/* DELETE exame */
router.delete('/emd/:id', (req, res) => {
  Exame.deleteExame(req.params.id)
    .then(exame => {
      res.status(200).json(exame)
    })
    .catch(erro => {
      res.status(523).json({error: erro, message: "Erro na remoção de um exame"})
    })
});

/* PUT exame */
router.put('/emd/:id', (req, res) => {
  Exame.updateExame(req.params.id,req.body)
    .then(exame => {
      res.status(200).json(exame)
    })
    .catch(erro => {
      res.status(524).json({error: erro, message: "Erro na atualização de um exame"})
    })
});

module.exports = router;
