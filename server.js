import express from 'express';
import http from 'http';
import routerprod from './routes/productos.routes.js';
import routercar  from './routes/carrito.routes.js'


const app = express();
const server = http.Server(app);
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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