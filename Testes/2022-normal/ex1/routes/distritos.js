var express = require('express');
var router = express.Router();
var cidades = require('../controllers/cidades')

/* GET home page. */
router.get('/', function(req, res, next) {
  cidades.getDistritos()
    .then(distritos => {
      dic = {}
      console.log(dic["boass"])
      for (item in distritos) {
        if (dic[distritos[item].distrito] == undefined)
          dic[distritos[item].distrito] = [{id : distritos[item].id, nome : distritos[item].nome}]
        else
          dic[distritos[item].distrito].push({id : distritos[item].id, nome : distritos[item].nome})
      }
      res.status(200).send(dic)
    })
    .catch(erro => {
      res.status(520).json({error: erro, message: "Erro na obtenção da lista de distritos"})
    })
});

module.exports = router;
