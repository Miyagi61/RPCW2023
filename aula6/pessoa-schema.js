var mongoose = require('mongoose')

// uri for mongoDB
var mongoDB = 'mongodb://127.0.0.1/world';

mongoose.connect(mongoDB, {useNewUrlParser: true , useUnifiedTopology: true})

var db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error....'))

db.once('open', () => {
    console.log('Conexão ao MongoDB fixe')

    var moradaSchema = new mongoose.Schema({
        cidade: String,
        distrito: String
    })

    var atributosSchema = new mongoose.Schema({
        fumador: Boolean,
        gosta_cinema: Boolean,
        gosta_viajar: Boolean,
        acorda_cedo: Boolean,
        gosta_ler: Boolean,
        gosta_musica: Boolean,
        gosta_comer: Boolean,
        gosta_animais_estimacao: Boolean,
        gosta_dancar: Boolean,
        comida_favorita: String
    })

    var pessoasSchema = new mongoose.Schema({
        name: String,
        idade: Number,
        morada: moradaSchema,
        desportos: [String],
        atributos: atributosSchema
    })
    
    var pessoasModel = mongoose.model('pessoa',pessoasSchema)
    
    
    var pessoas = [
        {
            'name': 'boas',
            'idade': 41
        }
    ]
    
    pessoasModel.create(pessoas)

    
    pessoasModel.find({name: {$regex:/boas/}})
        .then(docs => {
            console.log(docs)
        })
        .catch(erro => {
            console.log('Erro: ' + err)
        })
    
})


