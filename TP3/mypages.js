exports.pessoasPage = function(lista){

    var pagHTML = ` 
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="/w3.css"/>
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
            <tr onclick="window.location.href='/pessoas/${lista[i].id}'">
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
      <h5>Nº Entradas: ${lista.length}</h5>
    </footer>

    </div>     
        </body>
    </html>
    `
    return pagHTML;
}

exports.indexPage = function(){
    var pagHTML = ` 
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="w3.css"/>
            <meta charset="UTF-8">
            <title>Pag. Inicial</title>
        </head>
        <body>
            <div class="w3-card-4">

            <header class="w3-container w3-blue">
              <h1>Operações Possíveis</h1>
            </header>

            <div class="w3-container">
                <table class="w3-table-all">
                    <tr>
                        <th><a href="/pessoas">Listar Pessoas</a></th>
                    </tr> 
                    <tr>
                        <th><a href="/sexo">Distribuição por sexo</a></th>
                    </tr>
                    <tr>
                        <th><a href="/desporto">Distribuição por desporto</a></th>
                    </tr>
                    <tr>
                        <th><a href="/profissao">Top10 de profissões</a></th>
                    </tr>
                </table>
            </div>
        </body>
    </html>
    `


    return pagHTML;
}

exports.pessoa = function(pessoa){
    var pagHTML = ` 
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="../w3.css"/>
            <meta charset="UTF-8">
            <title>${pessoa.id}</title>
        </head>
        <body>
        <div class="w3-card-4">

            <header class="w3-container w3-blue">
              <h1>${pessoa.nome}</h1>
            </header>
            <table class="w3-table-all">      
    `;
    
    for (const key of Object.keys(pessoa)) {
        if (pessoa[key].constructor == Object) {
            pagHTML += `
            <tr>
                <td><b>${key}</b></td><td/> </tr>`
            for( const key2 of Object.keys(pessoa[key])){
                pagHTML += `
                    <tr><td>${key2}</td> <td>${pessoa[key][key2]}</td></tr>
                `
            }
        }
        else{
            pagHTML += `
            <tr>
                <td><b>${key}</b></td>
                <td>${pessoa[key]}</td>
            </tr>
            `  
        }
    };

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


exports.dist = function(lista,tipo){
    dist = {}

    if(tipo == 0){
        for(let i = 0; i < lista.length; i++){
            if(lista[i].sexo in dist){
                dist[lista[i].sexo] += 1;
            }
            else{
                dist[lista[i].sexo] = 1;
            }
        }
        tipo = "sexo"
    }
    else if (tipo == 1){
        for(let i = 0; i < lista.length; i++){
            if(lista[i].desportos != undefined){
                for(let j = 0; j < lista[i].desportos.length; j++){
                    if(lista[i].desportos[j] in dist){
                        dist[lista[i].desportos[j]] += 1;
                    }
                    else{
                        dist[lista[i].desportos[j]] = 1;
                    }
                }
            }
        }
        tipo = "desporto"     
    }
    else{
        for(let i = 0; i < lista.length; i++){
            if(lista[i].profissao in dist){
                dist[lista[i].profissao] += 1;
            }
            else{
                dist[lista[i].profissao] = 1;
            }
        }
        tipo = "profissao"

    }

    items = []

    for (var key in dist) {
      items.push([ key, dist[key] ])
    }
    items.sort(function compare(e1, e2) {
        return e2[1] - e1[1]
    })

    tipo == "profissao" ? len = 10 : len = items.length 


    var pagHTML = ` 
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="/w3.css"/>
            <meta charset="UTF-8">
            <title>Distribuição</title>
        </head>
        <body>
        <div class="w3-card-4">

            <header class="w3-container w3-blue">
              <h1>Distribuição por ${tipo}</h1>
            </header>

            <div class="w3-container">
                <table class="w3-table-all">
                    <tr>
                        <th>${tipo}</th>
                        <th>Nº Pessoas</th>
                    </tr>          
    `;

    for (let i = 0 ; i < len; i++) {
        pagHTML += `
            <tr onclick="window.location.href='/${tipo}/${items[i][0]}'">
                <td>${items[i][0]}</td>
                <td>${items[i][1]}</td>
            </tr>
        `
    }


    
    pagHTML += `
    </table>
    </div>

    <footer class="w3-container w3-blue">
      <h5>Nº Entradas: ${len}</h5>
    </footer>

    </div>     
        </body>
    </html>
    `
    return pagHTML;
}