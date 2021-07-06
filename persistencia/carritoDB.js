const fs = require('fs')
class CarritoDB {
    constructor() {
        
        this.productos = []
    }
   guardarEnArchivo (carritoBD){
    fs.writeFileSync('./DB/carrito.txt' , JSON.stringify(carritoBD))
   }
    leerArchivo(){
    return fs.readFileSync('./DB/carrito.txt', 'utf-8')
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

module.exports = new CarritoDB();