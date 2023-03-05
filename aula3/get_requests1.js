const axios = require('axios');

axios.get('http://localhost:3000/pessoas?CC=91258224-5-FV5')
    .then(function (resp) {
        var pessoas = resp.data;
        console.dir(pessoas[0].nome);
    })
    .catch( (error) => {
        console.log("Erro: " + error);
    }) 