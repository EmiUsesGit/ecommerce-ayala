// Primera entrega del Proyecto Final:

// Le pido al usuario que agregue el producto.
const agregarJuego = prompt("¿Cuál juego deseas comprar? Juego 1, Juego 2, Juego 3, Juego 4");
// Se declara un array de objeto.
const productos = [{id: 0, producto: "Juego 1", stock: 10, precio: "500"},
{id: 1, producto: "Juego 2", stock: 8, precio: "400"},
{id: 2, producto: "Juego 3", stock: 6, precio: "500"},
{id: 3, producto: "Juego 4", stock: 12, precio: "400"}];
// Se declara un array vacío para guardar los juegos seleccionadas.
const miCarrito = [];

// Creo la función para validar que exista el juego.
function juego() {
    for (const juego of productos) {
        if (juego.producto.toUpperCase() == agregarJuego.toUpperCase()) {
            return true;
        }
    }
    return false;
}

// Creo la función "¿tengo stock?"
function tengoStock() {
    for (const juego of productos) {
        if (juego.producto.toUpperCase() == agregarJuego.toUpperCase() && juego.stock > 0) {
            return true;
        }
    }
    return false;
}

// Obtengo el juego seleccionado.
function obtenerJuego() {
    for (const juego of productos) {
        if (juego.producto.toUpperCase() == agregarJuego.toUpperCase()) {
            return juego;
        }
    }
    return false;
}

// Agrego un juego al carrito y los voy acumulando.
function agregarJuego() {
    if (existeJuego() && tengoStock()) {
        miCarrito.push(obtenerJuego());
        return miCarrito;
    } else { console.log("El juego no tiene stock o no ingresaste bien su nombre."); }
}

// Creo una función para sumar los precios de los procuctos agregados en el carrito.
function sumarPrecio(miCarrito) {
    const miCompra = miCarrito;
    const total = miCompra.reduce((acc, el) =>acc + el.precio,0);
    console.log(total);
}

// Llamado de las funciones.
existeJuego();
tengoStock();
console.log(agregarJuego());
sumarPrecio(miCarrito);