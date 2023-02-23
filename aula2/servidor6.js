var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    var q = url.parse(req.url, true).query;
    var q2 = url.parse(req.url,true);
    console.dir(q2);

    var r = 0
    var op = ""
    if (q2.pathname == "/add") {
        r = parseInt(q.a,10) + parseInt(q.b,10);
        var txt = q.a + " + " + q.b + " = " + r;
    } else if (q2.pathname == "/sub") {
        r = parseInt(q.a,10) - parseInt(q.b,10);
        var txt = q.a + " - " + q.b + " = " + r;
    } else {
        var txt = "Não sei o que fazer!"
    }

    res.end(txt);
}).listen(7777);

console.log('Servidor à escuta na porta 7777...');