// Desafío complementario: Incorporar Arrays

class Productos{
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;

        if (stock == 0) {
            alert ("Lo sentimos, no hay stock");
        }
    }
}

const productos = ["Juegos PC", "Juegos PS4", "Juegos PS5", "Juegos XBOX", 
"Juegos Nintendo Switch"];

function AgregarAlCarrito(productos) {
    carritoDeCompra.push(productos);
    console.log(productos);
}

function QuitarDelCarrito(productos) {
    carritoDeCompra.pop(productos);
    console.log(productos);
}

