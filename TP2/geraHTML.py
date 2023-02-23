from bs4 import BeautifulSoup


def txt_strip(txt):
    return txt.get_text().strip()


def getAllChildren(elem,id):
    ligas = [txt_strip(x) for x in elem.find_all("liga")]

    txt = ""
    
    for string in elem.stripped_strings:
        if string in ligas:
            txt += f""" <a href="/{id}">{string}</a> """
        else:
            txt += string

    if elem.name == "biblio":
        txt = "<p><small>" + txt + "</small></p>"
    else:
        txt = "<p>" + txt + "</p>"

    return txt

def generateHTML(content):
    for (_,id,content) in content:
        pagWeb = ""
        html = open("sub_arq_html/arq" + str(id) + ".html", "w")

        atual = content.tipo

        while(atual != None):
            if atual.name == "tipo":
                pagWeb += f"<h3>{atual.get('assunto')}</h3>"
            elif atual.name == "identi":
                pagWeb += f"<h1>{txt_strip(atual)}</h1>"
            elif atual.name == "imagem":
                pagWeb += f"<p><img src='{atual.get('nome')}' alt='{atual.get('nome')}'></p>"
            elif atual.name == "concel":
                pagWeb += f"<p><b>Concelho:</b> {txt_strip(atual)}</p>"
            elif atual.name == "fregue":
                pagWeb += f"<p><b>Freguesia:</b> {txt_strip(atual)}</p>"
            elif atual.name == "codadm":
                pagWeb += f"<p><b>Código Administrativo:</b> {txt_strip(atual)}</p>"
            elif atual.name == "latitu":
                pagWeb += f"<p><b>Latitude:</b> {txt_strip(atual)}</p>"
            elif atual.name == "longit":
                pagWeb += f"<p><b>Longitude:</b> {txt_strip(atual)}</p>"
            elif atual.name == "altitu":
                pagWeb += f"<p><b>Altitude:</b> {txt_strip(atual)}</p>"
            elif atual.name == "deposi":
                pagWeb += f"<p><b>Deposição:</b>\n {txt_strip(atual)}</p>"
            elif atual.name == "autor":
                pagWeb += f"<p><i>{txt_strip(atual)}</i></p>"
            elif atual.name == "data":
                pagWeb += f"<p>[{txt_strip(atual)}]</p>"
            elif atual != "\n":
                pagWeb += getAllChildren(atual,id)

            atual = atual.next_sibling

        
        pagWeb += """
            </body>
        </html>
        """

        html.write(pagWeb)