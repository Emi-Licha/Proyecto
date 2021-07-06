const fs = require('fs')
class ProductoDB {
    constructor() {
    }
   guardar (producto){
    fs.writeFileSync('./DB/producto.txt', JSON.stringify(producto))
   }
    leerArchivo(){
    return fs.readFileSync('./DB/producto.txt', 'utf-8')
   }
   borrar (id){
    let respuesta = {}
    const produtoEliminado = this.productos.filter(a => a.id == id);
    if (produtoEliminado.length > 0){
        respuesta = produtoEliminado
        this.productos = this.productos.filter(a => a.id != id)
    }else{
        respuesta.error = 'Producto no encontrado para borrar'
    }
    return respuesta
    }
}

module.exports = new ProductoDB();