var Ligacoes = require("../models/ligacoes")
var mongoose = require('mongoose')

// Ligacoes list
module.exports.getLigacoesPorOrigem = origem => {
    // falta ir buscar os nomes das cidades
    return Ligacoes.find({origem:origem},{id:1,destino:1}).sort({"id":-1})
        .then(resposta => {
            console.dir(resposta)
            return resposta})
        .catch(erro => {
            return erro})
}

module.exports.getLigacoesPorDistancia = dist => {
    // falta ir buscar os nomes das cidades
    return Ligacoes.find({distancia:{$gte:dist}},{id:1,origem:1,destino:1}).sort({"id":-1})
        .then(resposta => {
            console.dir(resposta)
            return resposta})
        .catch(erro => {
            return erro})
}