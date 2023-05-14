var Ligacoes = require("../models/ligacoes")
var mongoose = require('mongoose')

// Ligacoes list
module.exports.getLigacoesPorOrigem = or => {
    // falta ir buscar os nomes das cidades
    return Ligacoes.find({origem:or},{id:1,destino:1,_id:0})
        .then(resposta => {
            return resposta})
        .catch(erro => {
            return erro})
}

module.exports.getLigacoesPorDistancia = dist => {
    // falta ir buscar os nomes das cidades
    console.dir(dist)
    return Ligacoes.find({"distância":{"$gte":parseFloat(dist)}},{id:1,origem:1,destino:1})
        .then(resposta => {
            return resposta})
        .catch(erro => {
            return erro})
}