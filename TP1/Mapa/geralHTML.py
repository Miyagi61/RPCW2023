
import json

def ordCidade(c):
    return c['nome']

def ordLigacao(l):
    return l[2]


f = open("mapa.json")
data = json.load(f)
cidades = data['cidades']
cidades.sort(key=ordCidade)

id_nome_cidades = {c['id']:c['nome'] for c in cidades}

ligacoes = data['ligações']

pagWeb = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <td width="30%" valign="top">
                    <h3>Índice</h3>
                    <a name="indice"/>
                    <!-- Lista com o índice -->
                    <ul>
"""

for c in cidades:
    pagWeb += f"""
        <li>
            <a href="#{c['id']}">{c['nome']}</a> 
        </li>
    """

pagWeb += """
</ul>
</td>
                <td width="70%">
"""
for c in cidades:
    lugares = f"<ol>"
    list_lugares = []
    for l in ligacoes:
        ligacao = ""
        nome_destino = ""
        if l['origem'] == c['id']:
            ligacao = l['origem']
            nome_destino = id_nome_cidades[l['destino']]

        elif l['destino'] == c['id']:
            ligacao = l['destino']
            nome_destino = id_nome_cidades[l['origem']]

        if nome_destino != "":
            list_lugares += [(c['id'],nome_destino, l['distância'])]
    
    list_lugares.sort(key=ordLigacao)

    for l in list_lugares:
        lugares += f"""
                        <li>
                            <a href="#{l[0]}">{l[1]} : {l[2]} km</a>
                        </li>
                """
    lugares += f"</ol>"
    pagWeb += f"""
                    <a name="{c['id']}"/>
                    <h3>{c['nome']}</h3>
                    <p><b>população:</b> {c['população']}</p>
                    <p><b>descrição:</b> {c['descrição']}</p>
                    <p><b>distrito:</b> {c['distrito']}</p>
                    <p><b>ligações:</b></p>
                    {lugares}
                    <address>[<a href="#indice">Voltar ao índice</a>]</address>
                    <center>
                        <hr width="80%"/>
                    </center> 
    """

pagWeb += """      
                </td>
            </tr>
        </table>
    </body>
</html>
"""

f = open("mapa.html", "w") 
f.write(pagWeb)                   