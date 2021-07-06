const express = require('express');
const router = express.Router();
const productos = require('../api/productos');


function auth(req, res, next){
    if(req.query.admin === 'true'){
        next()
    }else{
        res.send('No tiene autorizacion para ingresar a esta pagina')
    }
}
router.get('/listar', (req, res) => {
   res.json(productos.listar())
});

router.get('/listar/:id', (req, res) => {
    let { id } = req.params;
    if(id){
        res.json(productos.listarPorId(id))
    }else{
        res.json(productos.listar())
    }
});

router.post('/guardar', auth, (req, res) => {
    let producto = req.body;
    res.json(productos.guardar(producto));
});

router.put('/actualizar/:id', auth, (req, res) => {
    let { id } = req.params
    let producto = req.body
    res.json(productos.actualizar(id, producto));
});

router.delete('/borrar/:id', auth, (req, res) => {
    let { id } = req.params;
    res.json(productos.borrar(id));
});



module.exports = router;