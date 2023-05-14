var Cidades = require("../models/cidades")
var mongoose = require('mongoose')

// Cidades list
module.exports.list = () => {
    return Cidades.find({},{id:1,nome:1,distrito:1,_id:0})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getCidade = id => {
    return Cidades.findOne({id: id},{_id:0})
        .then(resposta => {
            return resposta})
        .catch(erro => {
            return erro})
}

module.exports.getNomesCidade = () => {
    return Cidades.find({},{nome:1,_id:0}).sort({"nome":1})
        .then(resposta => {
            return resposta})
        .catch(erro => {
            return erro})
}

module.exports.getCidadePorDistrito = distrito => {
    return Cidades.find({distrito:distrito},{id:1,nome:1,_id:0}).sort({"nome":1})
        .then(resposta => {
            return resposta})
        .catch(erro => {
            return erro})
}

module.exports.getDistritos = () => {
    return Cidades.find({},{id:1,nome:1,distrito:1,_id:0})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro})
}

module.exports.getIdPorNome = nome => {
    return Cidades.findOne({nome: nome},{id:1,_id:0})
        .then(resposta => {
            return resposta})
        .catch(erro => {
            return erro})
}

module.exports.getNomeId = () => {
    return Cidades.find({},{nome:1,_id:0,id:1})
        .then(resposta => {
            return resposta})
        .catch(erro => {
            return erro})
}