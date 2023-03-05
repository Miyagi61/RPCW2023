// pessoas_server.js
// RPCW2023: 2023-02-27
// by michi

const http = require('http');
const url = require('url');
const axios = require('axios');
var mypages = require('./mypages');
const fs = require('fs');

http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0,16);
    console.log(req.method + " " + req.url + " " + d)
    var dicURL = url.parse(req.url, true);

    if(dicURL.pathname == "/"){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(mypages.indexPage());
    }
    else if(dicURL.pathname == "/pessoas"){  
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
    else if(dicURL.pathname.startsWith("/pessoas/")){
        var id = dicURL.pathname.split("/")[2];
        axios.get('http://localhost:3000/pessoas/' + id)
            .then(function (resp) {
                var pessoa = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(mypages.pessoa(pessoa));
            })
            .catch( (error) => {
                console.log("Erro axios: " + error);
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end("ERRO: " + error)
            })    
    }
    else if(dicURL.pathname == "/sexo" || dicURL.pathname == "/desporto" || dicURL.pathname == "/profissao"){
        axios.get('http://localhost:3000/pessoas')
            .then(function (resp) {
                var pessoas = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                if (dicURL.pathname == "/sexo")
                    res.end(mypages.dist(pessoas,0));
                else if (dicURL.pathname == "/desporto")
                    res.end(mypages.dist(pessoas,1));
                else
                    res.end(mypages.dist(pessoas,2));
            })
            .catch( (error) => {
                console.log("Erro axios: " + error);
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end("ERRO: " + error)
            })
    }
    else if(dicURL.pathname.startsWith("/sexo/")){
        var id = dicURL.pathname.split("/")[2];
        axios.get('http://localhost:3000/pessoas?sexo=' + id +  '&_sort=nome&_order=asc')
            .then(function (resp) {
                var pessoa = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(mypages.pessoasPage(pessoa));
            })
            .catch( (error) => {
                console.log("Erro axios: " + error);
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end("ERRO: " + error)
            })    
    }
    else if(dicURL.pathname.startsWith("/desporto/")){
        var id = dicURL.pathname.split("/")[2];
        // get a list of people who practice a given sport
        id = decodeURI(id)
        axios.get('http://localhost:3000/pessoas?_sort=nome&_order=asc')
            .then(function (resp) {
                var pessoa = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                filtrada = []
                for(let i = 0; i < pessoa.length; i++){
                    for(let j = 0; j < pessoa[i].desportos.length; j++){
                        if(pessoa[i].desportos[j] == id){
                            filtrada.push(pessoa[i])
                        }
                    }
                }
                res.end(mypages.pessoasPage(filtrada));
            })
            .catch( (error) => {
                console.log("Erro axios: " + error);
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end("ERRO: " + error)
            }) 
    }
    else if(dicURL.pathname.startsWith("/profissao/")){
        var prof = dicURL.pathname.split("/")[2];
        prof = decodeURI(prof)
        axios.get('http://localhost:3000/pessoas?profissao=' + prof +  '&_sort=nome&_order=asc')
            .then(function (resp) {
                var pessoa = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(mypages.pessoasPage(pessoa));
            })
            .catch( (error) => {
                console.log("Erro axios: " + error);
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end("ERRO: " + error)
            })
    }
    else if(dicURL.pathname == "/w3.css"){
        fs.readFile('w3.css', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
            if (err) {
                console.log("Erro na leitura da stylesheet.");
                res.end("ERRO: " + err)
            }
            else {
                res.write(data);
                res.end();
            }
        });
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.end("Erro: Operação não suportada")
        console.log(dicURL)
    }
}).listen(7777);

console.log('Servidor à escuta na porta 7777...');