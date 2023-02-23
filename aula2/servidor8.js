var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    fs.readFile('pag.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        
        if(err)
            res.write('Erro: ' + err);
        else 
            res.write(data)
        
        res.end();
    }) 
}).listen(7777);

console.log('Servidor à escuta na porta 7777...');