var axios = require('axios')
var Exames = require("../models/exames")
var mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

// Exames list
module.exports.list = () => {
    return Exames.find({},{nome:1,dataEMD:1,resultado:1}).sort({"dataEMD":-1})
        .then(resposta => {
            console.dir(resposta)
            return resposta})
        .catch(erro => {
            return erro})
}

module.exports.getExame = id => {
    return Exames.findOne({_id: id})
        .then(resposta => {
            return resposta})
        .catch(erro => {
            return erro})
}

module.exports.addExame = a => {
    return Exames.create(a)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteExame = id => {
    return Exames.deleteOne({_id: id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateExame = (id,a) => {
    return Exames.updateOne({_id: id},a)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

