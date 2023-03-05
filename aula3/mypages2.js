exports.pessoasPage = function(lista){

    var pagHTML = ` 
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="w3.css"/>
            <meta charset="UTF-8">
            <title>About People...</title>
        </head>
        <body>
        <div class="w3-card-4">

            <header class="w3-container w3-blue">
              <h1>Lista de Pessoas</h1>
            </header>

            <div class="w3-container">
                <table class="w3-table-all">
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
    </div>

    <footer class="w3-container w3-blue">
      <h5>Footer</h5>
    </footer>

    </div>     
        </body>
    </html>
    `
    return pagHTML;
}