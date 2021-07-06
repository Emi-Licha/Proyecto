const express = require('express');
const routerprod = require('./routes/productos.routes.js');
const routercar = require('./routes/carrito.routes.js');

const http = require('http');
const app = express();
const server = http.Server(app);
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

app.use('/productos', routerprod)
app.use('/carrito', routercar)

function auth(req, res, next){
    if(req.query.admin === 'true'){
        next()
    }else{
        res.send('No tiene autorizacion para ingresar a esta pagina')
    }
}







server.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en puerto ${PORT}`)
})