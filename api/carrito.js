const carritodb = require('../persistencia/carritoDB');
const productobd = require('../persistencia/productoDB');
class Carrito {
    constructor() {
        this.count =0
        this.id = 0
        this.timestamp = new Date()
    }
   guardar (idProducto){
     this.count++
       try {
            carritodb.leerArchivo()
            this.guardarProductoCarrito(idProducto)
            return JSON.parse(carritodb.leerArchivo())
       } catch (error) {
           const carritoBD =[{
            
            producto:[]
           }] 
           carritodb.guardarEnArchivo(carritoBD)
           this.guardarProductoCarrito(idProducto)
           return JSON.parse(carritodb.leerArchivo())
       }

   }
   listarPorId(id){
    let carritoBD = carritodb.leerArchivo()
    carritoBD = JSON.parse(carritoBD)
    const carritoPorId =  carritoBD.find( carrito => carrito.id === parseInt(id));
    return carritoPorId
   }
   borrar (id){
    let carritoBD = carritodb.leerArchivo()
    carritoBD = JSON.parse(carritoBD)
    carritoBD = carritoBD[0]
    const prodEliminado = carritoBD.producto.find(prodEnCarrito => prodEnCarrito.id ===  parseInt(id))
    carritoBD.producto = carritoBD.producto.filter(prodEnCarrito => prodEnCarrito.id !=  parseInt(id))
    const prueba = [
        carritoBD
    ]
    carritodb.guardarEnArchivo(prueba)
    return prodEliminado
    }
    guardarProductoCarrito(idProducto){
        let carritoBD = carritodb.leerArchivo()
        carritoBD = JSON.parse(carritoBD)
        let productoDB = productobd.leerArchivo()
        productoDB = JSON.parse(productoDB)
        const productoPorId =  productoDB.find( prod => prod.id === parseInt(idProducto));
        if (carritoBD[0].producto.length >0 ){
         carritoBD[0].producto.push(productoPorId)
        }else{
         carritoBD[0].producto =[
             productoPorId
         ]
        }
        carritodb.guardarEnArchivo(carritoBD)
    }
}

module.exports = new Carrito();