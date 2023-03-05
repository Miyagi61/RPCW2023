// pessoas_server.js
// RPCW2023: 2023-02-27
// by michi

const http = require('http');
const url = require('url');
const axios = require('axios');
var mypages = require('./mypages');

http.createServer(function (req, res) {
    var dicURL = url.parse(req.url, true);

    if(dicURL.pathname == "/"){
        axios.get('http://localhost:3000/pessoas')
            .then(function (resp) {
                var pessoas = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(mypages.pessoasPage(pessoas));
            })
            .catch( (error) => {
                console.log("Erro axios: " + error);
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end("ERRO: " + error)
            })
    }
    else if(dicURL.pathname == "/ordenada"){
        axios.get('http://localhost:3000/pessoas?_sort=nome&_order=asc')
            .then(function (resp) {
                var pessoas = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(mypages.pessoasPage(pessoas));
            })
            .catch( (error) => {
                console.log("Erro axios: " + error);
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end("ERRO: " + error)
            })
    }
    else if(dicURL.pathname == "/ordenadav2"){
        axios.get('http://localhost:3000/pessoas')
            .then(function (resp) {
                var pessoas = resp.data;
                let pessoas_ordenadas = pessoas.sort( 
                    (p1,p2) =>  p1.nome < p2.nome ? -1 : 1
                );
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(mypages.pessoasPage(pessoas_ordenadas));
            })
            .catch( (error) => {
                console.log("Erro axios: " + error);
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end("ERRO: " + error)
            })
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.end("Erro: Operação não suportada")
    }
}).listen(7777);

console.log('Servidor à escuta na porta 7777...');