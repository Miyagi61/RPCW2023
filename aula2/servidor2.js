var http = require('http');
var meta = require('./aux');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write("Criada por " + meta.myName() + " em " + meta.myDateTime());
    res.end(' na aula de ' + meta.aula);
}).listen(7777);

console.log('Servidor à escuta na porta 7777...');