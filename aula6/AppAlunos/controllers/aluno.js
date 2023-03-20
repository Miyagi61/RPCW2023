var axios = require('axios')
var Student = require("../models/aluno")

// Student list
module.exports.list = () => {
    return Student.find().sort("nome")
        .then(resposta => {
            return resposta})
        .catch(erro => {
            return erro})
}

module.exports.getAluno = id => {
    return Student.findOne({id: id})
        .then(resposta => {
            return resposta})
        .catch(erro => {
            return erro})
}

module.exports.addAluno = a => {
    return Student.create(a)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateAluno = a => {
    return Student.updateOne({id: a.id},a)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteAluno = id => {
    return Student.deleteOne({id: id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}