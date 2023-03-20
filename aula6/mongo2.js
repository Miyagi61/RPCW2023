var mongoose = require('mongoose')

// uri for mongoDB
var mongoDB = 'mongodb://127.0.0.1/world';

mongoose.connect(mongoDB, {useNewUrlParser: true , useUnifiedTopology: true})

var db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error....'))

db.once('open', () => {
    console.log('Conexão ao MongoDB fixe')
    var pessoasSchema = new mongoose.Schema({
        name: String,
        idade: Number
    })
    
    var pessoasModel = mongoose.model('pessoas',pessoasSchema)
    
    
    var pessoas = [
        {
            'name': 'boas',
            'idade': 40
        }
    ]
    
    pessoasModel.create(pessoas)
    
    console.log('Tá bom')
})


