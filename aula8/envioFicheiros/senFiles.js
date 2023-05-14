const fs = require('fs')
const FormData = require('form-data')
const fetch = require('node-fetch')

function sendFile(fname){
    const FormData = new FormData()

    FormData.append('myFile', fs.createReadStream(fname))
    fetch('http://localhost:3000/files', {method: 'POST', body: FormData})
        .then(res => {
            if (res.ok) 
                console.log('Ficheiro enviado com sucesso')
            else
                console.log('Erro: ' + res.status)

        })
}

var ficheiros = ['arq.xml', 'mapa.json']

for(f of ficheiros){

}