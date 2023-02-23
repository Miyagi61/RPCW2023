var http = require('http');
var meta = require('./aux');

http.createServer(function (req, res) {
    console.log("Pedido: " + req.url);
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write(req.url);
    res.write("Criada por " + meta.myName() + " em " + meta.myDateTime());
    res.end(' na aula de ' + meta.aula);
}).listen(7777);

console.log('Servidor à escuta na porta 7777...');