  
const fs = require('fs')
const productobd = require('../persistencia/productoDB');
class Productos {
    constructor() {
        this.count =0
        this.productos = []
    }
   listar(){
    let productoBD = productobd.leerArchivo()
    return JSON.parse(productoBD)
   }
   guardar (producto){
    this.count++
    producto.id = this.count
    producto.timestamp = new Date()
    //this.productos.push(producto)
    let productoBD
       try {
        productoBD = productobd.leerArchivo()
        productoBD = JSON.parse(productoBD)
        
        let ultimoReg = productoBD[productoBD.length-1]
        const proxId  = ultimoReg.id +1 
        producto.id = proxId 
        productoBD.push(this.nuevoProducto(producto))
        productobd.guardar(productoBD)
        console.log(productoBD)
       } catch (error) {
        productoBD =[{
            nombre: producto.nombre,
            precio: producto.precio,
            foto: producto.foto,
            descripcion: producto.descripcion,
            codigo: producto.codigo,
            stock: producto.stock,
            id: producto.id,
            timestamp: producto.timestamp
        }]
        productobd.guardar(productoBD)
        productoBD = productobd.leerArchivo()
        console.log(productoBD)
       }
       return productoBD
   }
   listarPorId(idProducto){
    let productoBD = productobd.leerArchivo()
    productoBD = JSON.parse(productoBD)
    const productoPorId =  productoBD.find( prod => prod.id === parseInt(idProducto));
    console.log(productoPorId)
    return productoPorId
   }
   borrar (id){
    let productoBD = productobd.leerArchivo()
    productoBD = JSON.parse(productoBD)
    const produtoEliminado = productoBD.filter(a => a.id == id);
    productoBD = productoBD.filter(prod => prod.id !=  parseInt(id))

    productobd.guardar(productoBD)
    return produtoEliminado
    }
    nuevoProducto (producto){
        const nevoObjProd={
            nombre: producto.nombre,
            precio: producto.precio,
            foto: producto.foto,
            descripcion: producto.descripcion,
            codigo: producto.codigo,
            stock: producto.stock,
            id: producto.id,
            timestamp: producto.timestamp
        }
        return nevoObjProd
    }
}


module.exports = new Productos();