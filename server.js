const express = require('express')
const contenedor = require('./contenedor.js')

const app = express()
const PORT = 8080
const Productos = new contenedor()

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto: ${PORT}`)
})



app.get('/productos', async (req, res) => {
    let AllProd = await Productos.getAll()
    res.send(AllProd)
})

app.get('/productosRandom', async (req, res) => {
    let Prod = await Productos.getById(Math.floor(Math.random()*Productos.length()))
    res.send(Prod)
})