var express = require('express');
var router = express.Router();
var toDo = require('../controllers/toDo')

/* GET home page. */
router.get('/', function(req, res, next) {
  toDo.list()
      .then(tasks => res.render('index', { info: tasks, extra: {} }))
      .catch(error => res.render('error', {error: error}))
});

router.post('/', function(req , res, next) {
    result = req.body
    console.dir(result)
    switch(result.op){
          case "add":
              if(result.id != ""){
                console.log("edit")
                toDo.editTask(result.id, {
                      "date": result.date,
                      "person": result.person,
                      "task": result.task,
                      "done": 0,
                      })
                      .then(tasks => res.render('index', { info: tasks, extra: {} }))
                      .catch(error => res.render('error', {error: error}))
              }
              else{
                console.log("add")
                toDo.addTask({
                    "date": result.date,
                    "person": result.person,
                    "task": result.task,
                    "done": 0,
                  })
                    .then(tasks => res.render('index', { info: tasks, extra: {} }))
                    .catch(error => res.render('error', {error: error}))
              }
              break
          case "delete":
              toDo.deleteTask(result.id)
                .then(tasks => res.render('index', { info: tasks, extra: {} }))
                .catch(error => res.render('error', {error: error}))
              break
          case "edit":
              toDo.list()
                .then(tasks => res.render('index', { info: tasks, extra: result }))
                .catch(error => res.render('error', {error: error}))
              break
          case "done":
              toDo.doTask(result.id)
                .then(tasks => res.render('index', { info: tasks, extra: {} }))
                .catch(error => res.render('error', {error: error}))
              break
          case "undone":
              toDo.undoTask(result.id)
              .then(tasks => res.render('index', { info: tasks, extra: {} }))
              .catch(error => res.render('error', {error: error}))
      }  
});

module.exports = router;

/*
    var d = new Date().toISOString().substring(0, 16)
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

*/