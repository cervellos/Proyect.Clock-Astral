db.productos.insertOne({
nombre: 'Producto 1',
precio: 1233,
stock: 3,
marca: 'Marca 1',
categoria: 'Categoria 1',
detalles: 'Detalles 1',
foto: 'foto1.jpg',
envio: true,
})

db.product.insertMany([{
nombre: 'Producto 2',
precio: 1233,
stock: 3,
marca: 'Marca 2',
categoria: 'Categoria 2',
detalles: 'Detalles 2',
foto: 'foto2.jpg',
envio: true,
},{
nombre: 'Producto 3',
precio: 1233,
stock: 3,
marca: 'Marca 3',
categoria: 'Categoria 3',
detalles: 'Detalles 3',
foto: 'foto3.jpg',
envio: true,
},{
nombre: 'Producto 4',
precio: 1233,
stock: 3,
marca: 'Marca 4',
categoria: 'Categoria 4',
detalles: 'Detalles 4',
foto: 'foto4.jpg',
envio: true,
}])
