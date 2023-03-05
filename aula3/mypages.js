exports.pessoasPage = function(lista){

    var pagHTML = ` 
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>About People...</title>
        </head>
        <body>
            <h1>Lista de Pessoas</h1>
            <table border=1>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Sexo</th>
                    <th>Cidade</th>
                </tr>
    `;

    for (let i = 0; i < lista.length; i++) {
        pagHTML += `
            <tr>
                <td>${lista[i].id}</td>
                <td>${lista[i].nome}</td>
                <td>${lista[i].idade}</td>
                <td>${lista[i].sexo}</td>
                <td>${lista[i].morada.cidade}</td>
            </tr>
        `
    }
    pagHTML += `
            </table>
        </body>
    </html>
    `
    return pagHTML;
}