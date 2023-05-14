var express = require('express');
var router = express.Router();
var Cidades = require('../controllers/cidades')

/* GET home page. */
router.get('/', function(req, res, next) {

  req.query.distrito ?
      Cidades.getCidadePorDistrito(req.query.distrito).then(cidades => {
        res.status(200).json(cidades)
      })
      .catch(erro => {
        res.status(520).json({error: erro, message: "Erro na obtenção da lista de cidades"})
      }) 
    :
      Cidades.list()
      .then(cidades => {
        res.status(200).json(cidades)
      })
      .catch(erro => {
        res.status(520).json({error: erro, message: "Erro na obtenção da lista de cidades"})
      })
});

router.get('/nomes', function(req, res, next) {
  Cidades.getNomesCidade()
    .then(cidades => {
      res.status(200).json(cidades)
    })
    .catch(erro => {
      res.status(520).json({error: erro, message: "Erro na obtenção da lista de nomes das cidades"})
    })
});

router.get('/:id', function(req, res, next) {
  Cidades.getCidade(req.params.id)
    .then(cidades => {
      res.status(200).json(cidades)
    })
    .catch(erro => {
      res.status(520).json({error: erro, message: "Erro na obtenção da cidades"})
    })
});


module.exports = router;
