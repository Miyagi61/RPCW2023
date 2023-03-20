var axios = require('axios')
var Pessoas = require("../models/pessoas")

// Pessoas list
module.exports.list = () => {
    return Pessoas.find().sort("nome")
        .then(resposta => {
            return resposta})
        .catch(erro => {
            return erro})
}

module.exports.getPessoa = id => {
    return Pessoas.findOne({id: id})
        .then(resposta => {
            return resposta})
        .catch(erro => {
            return erro})
}

module.exports.addPessoa = a => {
    return Pessoas.create(a)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updatePessoa = a => {
    return Pessoas.updateOne({id: a.id},a)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deletePessoa = id => {
    return Pessoas.deleteOne({id: id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}