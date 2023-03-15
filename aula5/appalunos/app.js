const express = require("express")
const app = express()
const port = 7777

app.get("/", (req, res,next) => {
    res.send("Olá turma 2023")
})

app.listen(port, () => {
    console.log(`Servidor a ouvir na porta ${port}`)
})