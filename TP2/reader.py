import sys
from bs4 import BeautifulSoup
from geraHTML import *

def parseLog(file):
    xml = open(file).read()
    soup = BeautifulSoup(xml,features="lxml")
    i = 1
    list = []
    for message in soup.findAll('arqelem'):
        output = open("sub_arq/arq" + str(i) + ".xml", "w")
        output.write(message.prettify())
        list.append((message.identi.get_text().strip(),i,message))         
        i+=1

    list.sort(key=lambda tup: tup[0])
    
    return list

def generateINDEX(list):
    index = open("index.html", "w")

    pagWeb = """
    <!DOCTYPE html>
    <html>
        <head>
            <title>Arqueositios</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h3>Índice</h3>
            <!-- Lista com o índice -->
            <ul>
    """

    for (nome,id,_) in list:
        pagWeb += f"""
                <li>
                    <a href="/{id}">{nome}</a> 
                </li>
        """
    pagWeb += """
            </ul> 
        </body>
    </html>
    """

    index.write(pagWeb) 



if __name__ == "__main__":
    content = parseLog("arq.xml")
    generateINDEX(content)
    generateHTML(content)
