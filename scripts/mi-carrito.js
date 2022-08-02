//Declaro un array de objeto
const productos = [
    { id: 0, nombre: "The exorcism of God", stock: 4, precio: "400" , tipo:"alquiler", badge: "Terror", img: "../images/movies/The_Exorcism_of_God_movie.jpg"},
    { id: 1, nombre: "Senior Year", stock: 2, precio: "700" , tipo:"alquiler", badge: "Comedia", img: "../images/movies/Senior_Year_movie.jpg"},
    { id: 2, nombre: "The fault in our stars", stock: 1, precio: "1000" , tipo:"alquiler", badge: "Romántica", img: "../images/movies/Fault-in-our-stars-movie.jpg"},
    { id: 3, nombre: "Star wars Episode I", stock: 0, precio: "1000" , tipo:"alquiler", badge: "Ciencia Ficción", img: "../images/movies/star_wars_movie_2.jpg"},
    { id: 4, nombre: "Remember me", stock: 8, precio: "1000" , tipo:"alquiler", badge: "Romántica/Drama", img: "../images/movies/remember_ne_movie.jpg"},
    { id: 5, nombre: "Red Notice", stock: 7, precio: "1000" , tipo:"alquiler", badge: "Comedia", img: "../images/movies/red_notice_movie.jpg"},
    { id: 6, nombre: "The Unholy", stock: 0, precio: "1000" , tipo:"alquiler", badge: "Terror", img: "../images/movies/the_unholy_movie.jpg"},
    { id: 7, nombre: "Star Wars: The Rise of Skywalker", stock: 0, precio: "650" , tipo:"alquiler", badge: "Ciencia Ficción", img: "../images/movies/star_wars_movie.jpg"},
    { id: 8, nombre: "Volver al futuro II", stock: 4, precio: "400" , tipo:"venta", badge: "Comedia/Aventuras", img: "../images/movies/volver_al_futuro_movie.jpg"},
    { id: 9, nombre: "X-men: The last stan", stock: 2, precio: "700" , tipo:"venta", badge: "Acción/Ficción", img: "../images/movies/x-men_movie.jpg"},
    { id: 10, nombre: "Split", stock: 1, precio: "1000" , tipo:"venta", badge: "Suspenso", img: "../images/movies/fragmentado-movie.jpg"},
    { id: 11, nombre: "Hellboy", stock: 0, precio: "1000" , tipo:"venta", badge: "Acción/Ficción", img: "../images/movies/hellboy_movie.jpg"},
    { id: 12, nombre: "Jurassic Park I", stock: 8, precio: "1000" , tipo:"venta", badge: "Aventura", img: "../images/movies/jurassic-park-movie.jpg"},
    { id: 13, nombre: "The forever Purge", stock: 7, precio: "1000" , tipo:"venta", badge: "Acción/+16", img: "../images/movies/La_Purga_Infinita_movie.jpg"},
    { id: 14, nombre: "Piratas del Caribe: El cofre de la muerte", stock: 0, precio: "1000" , tipo:"venta", badge: "Comedia/Aventura", img: "../images/movies/piratas_del_caribe_movie.jpg"},
    { id: 15, nombre: "Resident Evil", stock: 0, precio: "650", tipo:"venta", badge: "Terror/Acción", img: "../images/movies/resident_evil_movie.jpg"}
]
//Declaro un array vacío para guardar las peliculas seleccionadas.
let carrito = [];
//variable para la cantidad de productos del carrito en el Badge del menú.
const cantidadProdBadge = document.querySelector("#cantidad-prod");

//Recorro carrito y genero cards html. PAGE alquiler.html.
function cardsAlquiler() {
    let emptyList = document.querySelector("#cards-alquiler");
    for (let namePeli of productos) {
        let listadoCards = document.createElement("div");
        let label;
        if(namePeli.tipo == "alquiler"){
            label = "Alquiler";
        }else{
            label = "Comprar";
        }
        listadoCards.classList.add("col", "mb-5");
        listadoCards.innerHTML = `
        <div class="card h-100">
        <!-- Sale badge-->
        <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">${namePeli.badge}</div>
        <!-- Product image-->
        <img class="card-img-top" src="${namePeli.img}" alt="..." />
        <!-- Product details-->
        <div class="card-body p-4">
        <div class="text-center text-dark">
        <!-- Product name-->
        <h5 class="fw-bolder">${namePeli.nombre}</h5>
        <!-- Product price-->
        $ ${namePeli.precio}
        </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div class="text-center"><a class="btn btn-outline-dark mt-auto agregar-carrito" id="${namePeli.id}">${label}</a></div>
        </div>
        </div>
        </div>
        `;
        emptyList.appendChild(listadoCards);
    }
    cargarEventListeners();
}


//Función para agregar al carrito con click.
function cargarEventListeners() {
    document.querySelectorAll(".agregar-carrito").forEach(peliculaBtn => {
        peliculaBtn.addEventListener("click", agregarPelicula);
    })
}

//Agrego pelicula al carrito y las voy acumulando.
function agregarPelicula(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const peliculaSeleccionada = obtenerPeli(e.target.id);
        console.log(peliculaSeleccionada);
        if (peliculaSeleccionada.stock > 0) {
            carrito.push(peliculaSeleccionada);
            sessionStorage.setItem("carrito", JSON.stringify(carrito));
            cantidadProdBadge.textContent = carrito.length;
            alert("Agregaste la película: " + peliculaSeleccionada.nombre);
        } 
        else { 
            alert("No hay stock de la pelicula seleccionada."); 
        }
    }
}

//Obtengo la pelicula seleccionada
function obtenerPeli(idPelicula) {
    for (const pelicula of productos) {
        if (pelicula.id == idPelicula) {
            return pelicula;
        }
    }
    return null;
}

//Recorro carrito y genero lista html. PAGE mi-carrito.html.
function agregoListaMiCarrito() {
    let emptyList = document.querySelector("#listaUl");
    let carrito = JSON.parse(sessionStorage.getItem("carrito"));
    cantidadProdBadge.textContent = carrito.length;
    for (let namePeli of carrito) {
        let listado = document.createElement("li");
        listado.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-condensed");
        listado.innerHTML = `<div><h6 class="my-0">${namePeli.nombre}</h6></div><span class="text-muted">${namePeli.precio}</span>`;
        emptyList.appendChild(listado);
    }
    cupon()
    sumarPrecio(carrito);
}

//Recorro carrito y genero lista html. PAGE checkout.html.
function listaCheckout() {
    let emptyList = document.querySelector("#listaUl");
    let carrito = JSON.parse(sessionStorage.getItem("carrito"));
    cantidadProdBadge.textContent = carrito.length;
    for (let namePeli of carrito) {
        let listado = document.createElement("li");
        listado.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-condensed");
        listado.innerHTML = `
        <div>
        <h6 class="my-0">${namePeli.nombre}</h6>
        <small class="text-muted">${namePeli.tipo}</small>
        </div>
        <span class="text-muted">$ ${namePeli.precio}</span>
        `;
        emptyList.appendChild(listado);
    }
    cupon()
    sumarPrecio(carrito);
}

//Funcion sumar los precios de los procuctos agregados en el carrito solamente.
function sumarPrecio(carrito) {
    const miCompra = carrito;
    const total = miCompra.reduce((acc, miCompra) => acc + parseInt(miCompra.precio), 0);
    let emptyListPrice = document.querySelector("#listaUl");
    let listPrice = document.createElement("li");
    listPrice.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-condensed");
    listPrice.innerHTML = `<span>Total:</span><strong>${total}</strong>`;
    emptyListPrice.appendChild(listPrice);
    console.log(total);
}

//agrego solamente la sección del campo del cupon.
function cupon() {
    let emptyListCupon = document.querySelector("#listaUl");
    let listCupon = document.createElement("li");
    listCupon.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-condensed");
    listCupon.innerHTML = `<div class="text-success"><h6 class="my-0">Codigo promocional</h6>
    <small>EXAMPLECODE (agregado a modo ejemplo)</small></div><span class="text-success">- $10</span>`;
    emptyListCupon.appendChild(listCupon);
}

