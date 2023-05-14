var Cidades = require("../models/cidades")
var mongoose = require('mongoose')

// Cidades list
module.exports.list = () => {
    return Cidades.find({},{id:1,nome:1,distrito:1}).sort({"id":-1})
        .then(resposta => {
            console.dir(resposta)
            return resposta})
        .catch(erro => {
            return erro})
}

module.exports.getCidade = id => {
    return Cidades.findOne({id: id})
        .then(resposta => {
            return resposta})
        .catch(erro => {
            return erro})
}

module.exports.getNomesCidade = () => {
    return Cidades.find({},{nome:1}).sort({"nome":1})
        .then(resposta => {
            console.dir(resposta)
            return resposta})
        .catch(erro => {
            return erro})
}

module.exports.getCidadePorDistrito = distrito => {
    return Cidades.find({distrito:distrito},{id:1,nome:1}).sort({"nome":1})
        .then(resposta => {
            console.dir(resposta)
            return resposta})
        .catch(erro => {
            return erro})
}

