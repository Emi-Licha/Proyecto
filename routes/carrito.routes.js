import express from 'express';
import fs from 'fs';
import Productos from '../api/productos.js';
const router = express.Router();
const rutaC = './carrito.txt'
const ruta = './productos.txt'

let productos = new Productos;
let productosCarrito = new Productos;


async function read(rutaC) {
    try {
        const archivo = await fs.promises.readFile(rutaC);
        productosCarrito = JSON.parse(archivo);
    } catch (err) {
        res.send("No se encontraron productos");
    }
}

async function readP(ruta) {
    try {
        const archivo = await fs.promises.readFile(ruta);
        productos = JSON.parse(archivo);
    } catch (err) {
        res.send("No se encontraron productos");
    }
}
readP(ruta);


router.get('/listar', (req, res) => {
    
    read(rutaC);
    res.json(productosCarrito.listar());
});

router.get('/listar/:id', (req, res) => {
    read(rutaC)
    let { id } = req.params;
    res.json(productosCarrito.buscarPorId(id));
});

router.post('/guardar/:id', (req, res) => {
   
    let { id } = req.params;
    const producto = productos.buscarPorId(id)
    if(producto){
        productosCarrito.push(producto)
        res.json(productosCarrito);
    let data = JSON.stringify(productosCarrito,null,2);
    fs.writeFileSync(rutaC, data, 'utf-8')
    }else{
        res.json('There is no product');
    }
});

router.delete('/borrar/:id', (req, res) => {
    let { id } = req.params;
    res.json(productosCarrito.borrar(id));
    let data = JSON.stringify(productosCarrito,null,2);
    fs.writeFileSync(rutaC, data, 'utf-8')
});

export default router;