var jwt = require('jsonwebtoken')
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pY2hpIiwibGV2ZWwiOiJhZG1pbiIsImlhdCI6MTY4MjMzMjg1OCwiZXhwIjoxNjgyMzMyODY4fQ.ruQzrKL5E2lvfUQaW1q1xgeH-_fZCtnrJh2LIdn8qvI"
try{
    jwt.verify(token, 'RPCW2023', function(err, decoded) {
        if(err)
            console.log('Erro na verificação do token: ' + err)
        else
            console.log('Token verificado: ' + JSON.stringify(decoded))
            console.log(jwt.decode(token))
    })

    
}
catch(e){
    console.log('Erro na decodificação do token: ' + e)       
}