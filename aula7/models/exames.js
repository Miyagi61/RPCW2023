var mongoose = require('mongoose')

var nomeSchama = new mongoose.Schema({
    primeiro: String,
    "último": String
},{ _id: false })

var exameSchema = new mongoose.Schema({
    _id: String,
    index: Number,
    dataEMD: String,
    nome: nomeSchama,
    idade: Number,
    "género": String,
    morada: String,
    modalidade: String,
    clube: String,
    email: String,
    federado: Boolean,
    resultado: Boolean
},{ versionKey: false })
    
module.exports = mongoose.model('exame',exameSchema)
    
  