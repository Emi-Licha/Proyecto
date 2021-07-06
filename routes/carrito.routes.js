const express = require('express');
const router = express.Router();
const carrito = require('../api/carrito');


router.get('/listar', (req, res) => {
    res.json(carrito.listar());
});

router.get('/listar/:id', (req, res) => {
    let { id } = req.params;
    res.json(carrito.listarPorId(id));
});

router.post('/agregar/:id', (req, res) => {
   
    let { id } = req.params;
    res.json(carrito.guardar(id))
});

router.delete('/borrar/:id', (req, res) => {
    let { id } = req.params;
    res.json(carrito.borrar(id));
});

module.exports = router;