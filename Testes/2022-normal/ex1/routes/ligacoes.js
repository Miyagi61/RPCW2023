var express = require('express');
var router = express.Router();
var Cidades = require('../controllers/cidades')
var Ligacoes = require('../controllers/ligacoes')

function getNomePorId(nomes, id){
  for (j = 0 ; j < nomes.length ; j++){
    if(nomes[j].id == id){
      return nomes[j].nome
    }
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  origem = req.query.origem
  dist = req.query.dist
  resp = [] 
  if(origem){
    Cidades.getNomeId()
    .then(id_nome => {
      id_origem = id_nome.find(c => c.nome == origem)
    
      Ligacoes.getLigacoesPorOrigem(id_origem.id)
        .then(ligacoes => {
          for(i = 0 ; i < ligacoes.length ; i++){
            nome = getNomePorId(id_nome, ligacoes[i].destino)
            lig = ligacoes[i]
            resp.push({id: lig.id, id_destino: lig.destino, nome_destino: nome})
          }
          res.status(200).json(resp)
        })
        .catch(erro => {
          res.status(520).json({error: erro, message: "Erro na obtenção da lista de ligacoes"})
        })
    })
    .catch(erro => {
      res.status(520).json({error: erro, message: "Erro na obtenção da lista de ligacoes"})
    })
  }
  else if(dist){
    Cidades.getNomeId()
    .then(id_nome => {
      Ligacoes.getLigacoesPorDistancia(dist)
        .then(ligacoes => {
          for(i = 0 ; i < ligacoes.length ; i++){
            nome_origem = getNomePorId(id_nome, ligacoes[i].destino)
            nome_destino = getNomePorId(id_nome, ligacoes[i].origem)
            lig = ligacoes[i]
            resp.push({id: lig.id, id_origem: lig.origem, nome_origem: nome_origem , id_destino: lig.destino, nome_destino: nome_destino})
          }
          res.status(200).json(resp)
        })
        .catch(erro => {
          res.status(520).json({error: erro, message: "Erro na obtenção da lista de ligacoes"})
        })
    })
    .catch(erro => {
      res.status(520).json({error: erro, message: "Erro na obtenção da lista de ligacoes"})
    })
  }
  else{
    res.status(404)
  }
});



module.exports = router;
