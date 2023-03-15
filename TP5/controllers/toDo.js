var axios = require('axios');
const { response } = require('express');

function list(){
    return axios.get('http://localhost:3000/toDo')
        .then(response => response.data)
        .catch(error => error)
}

module.exports.list = list

//module.exports.getTask = (id) => {
//    return axios.get('http://localhost:3000/toDo/' + id)
//        .then(response => response.data)
//        .catch(error => error)
//}
                
module.exports.addTask = (task) => {
    return axios.post('http://localhost:3000/toDo', task)
        .then(response => list())
        .catch(error => error)
}

module.exports.editTask = (id, task) => {
    return axios.put('http://localhost:3000/toDo/' + id, task)
        .then(response => list())
        .catch(error => error)
}

module.exports.doTask = (id) => {
    return axios.patch('http://localhost:3000/toDo/' + id, { done : 1 })
        .then(response => list())
        .catch(error => error)
}

module.exports.undoTask = (id) => {
    return axios.patch('http://localhost:3000/toDo/' + id, { done : 0 })
        .then(response => list())
        .catch(error => error)
}

module.exports.deleteTask = (id) => {
    return axios.delete('http://localhost:3000/toDo/' + id)
        .then(response => list())
        .catch(error => error)
}
