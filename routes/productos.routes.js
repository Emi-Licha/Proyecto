import express from 'express';
import Productos from '../api/productos.js';
import fs from 'fs';
const router = express.Router();
const ruta = "./productos.txt";

let productos = new Productos;


router.get('/listar', (req, res) => {
    async function read(ruta) {
        try {
            const archivo = await fs.promises.readFile(ruta);
            res.send(JSON.parse(archivo));
        } catch (err) {
            res.send("No se encontraron productos");
        }
    }
    read(ruta);
    res.json(productos.listar());
});

router.get('/listar/:id', (req, res) => {
    let { id } = req.params;
    res.json(productos.buscarPorId(id));
});

router.post('/guardar', (req, res) => {
    let producto = req.body;
    res.json(productos.guardar(producto));
    let data = JSON.stringify(productos,null,2);
    fs.writeFileSync(ruta, data, 'utf-8')
});

router.put('/actualizar/:id', (req, res) => {
    let { id } = req.params
    let producto = req.body
    res.json(productos.actualizar(id, producto));
    let data = JSON.stringify(productos,null,2);
    fs.writeFileSync(ruta, data, 'utf-8')
});

router.delete('/borrar/:id', (req, res) => {
    let { id } = req.params;
    res.json(productos.borrar(id));
    let data = JSON.stringify(productos,null,2);
    fs.writeFileSync(ruta, data, 'utf-8')
});

router.get('/vista', (req, res) => {
    let prods = productos.listar();
    res.render('lista', { productos: prods, hayProductos: prods.length });
});

export default router;