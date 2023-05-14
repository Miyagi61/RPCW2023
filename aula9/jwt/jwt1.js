var jwt = require('jsonwebtoken')

try{
    var token = jwt.sign({username : 'michi',
                          level : 'admin' }, 'RPCW2023', {expiresIn: 10});
    console.log('Token: ' + token)
}
catch(e){
    console.log('Erro na criação do token: ' + e)       
}