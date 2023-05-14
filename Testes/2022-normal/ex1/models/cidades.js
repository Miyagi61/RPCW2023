var mongoose = require('mongoose')

var cidadeSchema = new mongoose.Schema({
    id: String,
    nome: String,
    "população": String,
    "descrição": String,
    "distrito": String
},{ versionKey: false, _id: false })
    
module.exports = mongoose.model('cidade',cidadeSchema)
    
  