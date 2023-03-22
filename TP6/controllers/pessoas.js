var axios = require('axios')
var Pessoas = require("../models/pessoas")
var mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
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
    return Pessoas.create({
        nome: a.nome,
        idade: a.idade,
        "morada.cidade": a.cidade,
        "morada.distrito": a.distrito,
        sexo: a.sexo,
        BI: a.BI,
        CC: a.CC,
        descrição: a.descrição,
        profissao: a.profissao,
        partido_politico: {party_abbr: a.party_abbr, party_name: a.party_name},
        religiao: a.religiao,
        desportos: a.desportos.split(","),
        animais: a.animais.split(","),
        figura_publica_pt: a.figura_publica_pt.split(","),
        marca_carro: a.marca_carro,
        destinos_favoritos: a.destinos_favoritos.split(","),
        atributos: {
            fumador: a.fumador,
            gosta_cinema: a.gosta_cinema,
            gosta_viajar: a.gosta_viajar,
            acorda_cedo: a.acorda_cedo,
            gosta_ler: a.gosta_ler,
            gosta_musica: a.gosta_musica,
            gosta_comer: a.gosta_comer,
            gosta_animais_estimacao: a.gosta_animais_estimacao,
            gosta_dancar: a.gosta_dancar,
            comida_favorita: a.comida_favorita
        },
        id: uuidv4() 
    })
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updatePessoa = a => {
    return Pessoas.updateOne({id: a.id},
        {
            nome: a.nome,
            idade: a.idade,
            "morada.cidade": a.cidade,
            "morada.distrito": a.distrito,
            sexo: a.sexo,
            BI: a.BI,
            CC: a.CC,
            descrição: a.descrição,
            profissao: a.profissao,
            partido_politico: {party_abbr: a.party_abbr, party_name: a.party_name},
            religiao: a.religiao,
            desportos: a.desportos.split(","),
            animais: a.animais.split(","),
            figura_publica_pt: a.figura_publica_pt.split(","),
            marca_carro: a.marca_carro,
            destinos_favoritos: a.destinos_favoritos.split(","),
            atributos: {
                fumador: a.fumador,
                gosta_cinema: a.gosta_cinema,
                gosta_viajar: a.gosta_viajar,
                acorda_cedo: a.acorda_cedo,
                gosta_ler: a.gosta_ler,
                gosta_musica: a.gosta_musica,
                gosta_comer: a.gosta_comer,
                gosta_animais_estimacao: a.gosta_animais_estimacao,
                gosta_dancar: a.gosta_dancar,
                comida_favorita: a.comida_favorita
            }
        }
        )
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