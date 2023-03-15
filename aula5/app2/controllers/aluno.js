var axios = require('axios');

module.exports.list = () => {
    return axios.get('http://localhost:3000/alunos?_sort=nome')
        .then(response => response.data)
        .catch(error => error)
}

module.exports.getAluno = (id) => {
    return axios.get('http://localhost:3000/alunos/' + id)
        .then(response => response.data)
        .catch(error => error)
}
                
module.exports.addAluno = (aluno) => {
    return axios.post('http://localhost:3000/alunos', aluno)
        .then(response => response.data)
        .catch(error => error)
}

module.exports.editAluno = (aluno) => {
    return axios.put('http://localhost:3000/alunos/' + aluno.id, aluno)
        .then(response => response.data)
        .catch(error => error)
}

module.exports.deleteAluno = (id) => {
    return axios.delete('http://localhost:3000/alunos/' + id)
        .then(response => response.data)
        .catch(error => error)
}
