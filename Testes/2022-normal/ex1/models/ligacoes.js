var mongoose = require('mongoose')

var ligacaoSchema = new mongoose.Schema({
    id: String,
    origem: String,
    destino: String,
    distancia: Number,
},{ versionKey: false, _id: false })
    
module.exports = mongoose.model('ligacoes',ligacaoSchema)
    
  