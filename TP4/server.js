// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr

var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');
const { PassThrough } = require('stream');


function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

function loadPage(res,extra){
    axios.get("http://localhost:3000/toDo")
                        .then(response => {
                            var toDo = response.data
                            // Render page with the student's list
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.spa(toDo, extra))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de alunos... Erro: " + erro)
                            res.end()
                        })
}

// Server creation

var alunosServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                
                // GET /alunos --------------------------------------------------------------------
                if((req.url == "/")){
                    loadPage(res,d)
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            case "POST":
                if(req.url == '/'){
                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                    
                    collectRequestBodyData(req, result => {
                        if(result){
                            switch(result.op){
                                case "add":
                                    if(result.id != ""){
                                        axios.put(`http://localhost:3000/toDo/${result.id}`, {
                                            "date": result.date,
                                            "person": result.person,
                                            "task": result.task,
                                            "done": 0,
                                            })
                                            .then(resp => {
                                                loadPage(res,{})
                                            })
                                            .catch(erro => {
                                                    console.log("Erro: " + erro)
                                            })
                                    }
                                    else{
                                        axios.post("http://localhost:3000/toDo", {
                                        "date": result.date,
                                        "person": result.person,
                                        "task": result.task,
                                        "done": 0,
                                        })
                                        .then(resp => {
                                            loadPage(res,{})
                                        })
                                        .catch(erro => {
                                                console.log("Erro: " + erro)
                                        })
                                    }
                                    break
                                case "delete":
                                    axios.delete(`http://localhost:3000/toDo/${result.id}`)
                                    .then(resp => {
                                        loadPage(res,{})
                                    })
                                    .catch(erro => {
                                            console.log("Erro: " + erro)
                                    })
                                    break
                                case "edit":
                                    loadPage(res,result)
                                    break
                                case "done":
                                    axios.patch(`http://localhost:3000/toDo/${result.id}`, {
                                        "done": 1,
                                    })
                                    .then(resp => {
                                        loadPage(res,d)
                                    })
                                    .catch(erro => {
                                            console.log("Erro: " + erro)
                                    })
                                    break
                                case "undone":
                                    axios.patch(`http://localhost:3000/toDo/${result.id}`, {
                                        "done": 0,
                                    })
                                    .then(resp => {
                                        loadPage(res,d)
                                    })
                                    .catch(erro => {
                                            console.log("Erro: " + erro)
                                    })
                            }
                            
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



