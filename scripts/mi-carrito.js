//Declaro una variable global de productos de mi archivo JSON con Fetch:
let productos =[];
fetch('../scripts/productos.json')
.then((response) => response.json())
.then((productosJSON)=> {productos = productosJSON});

//Declaro un array vacío para guardar las peliculas seleccionadas.
let carrito = sessionStorage.getItem("carrito") == null ? [] : JSON.parse(sessionStorage.getItem("carrito"));
//variable para la cantidad de productos del carrito en el Badge del menú.
const cantidadProdBadge = document.querySelector("#cantidad-prod");
//Cantidad del carrito en el menú.
cantidadProdBadge.textContent = carrito.length;
//Recorro carrito y genero cards html. PAGE alquiler.html.
function cardsAlquiler() {
    let emptyList = document.querySelector("#cards-alquiler");
    for (let namePeli of productos) {
        let listadoCards = document.createElement("div");
        let label = namePeli.tipo == "alquiler" ? "Alquilar" : "Comprar";
        if (namePeli.stock <= 0) {
            label = "Sin stock";
        }
        listadoCards.classList.add("col", "mb-5");
        if(existePeli(namePeli.id)){
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
            <div class="text-center"><a class="btn btn-outline-dark mt-auto agregar-carrito" id="${namePeli.id}" style="display:none">${label}</a>
            <a class="btn btn-outline-dark mt-auto eliminar-carrito" id="remove-${namePeli.id}">Quitar</a></div>
            </div>
            </div>
            </div>
            `;
        }else{
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
            <div class="text-center"><a class="btn btn-outline-dark mt-auto agregar-carrito" id="${namePeli.id}">${label}</a>
            <a class="btn btn-outline-dark mt-auto eliminar-carrito" id="remove-${namePeli.id}" style="display:none">Quitar</a></div>
            </div>
            </div>
            </div>
            `;
        }
        emptyList.appendChild(listadoCards);
    }
    cargarEventListeners();
}

//Creo la funcion para validar que exista la película en el carrito.
function existePeli(id) {
    for (const pelicula of carrito) {
        if (pelicula.id == id) {
            return true;
        }
    }
    return false;
}

//Función para agregar al carrito con click.
function cargarEventListeners() {
    document.querySelectorAll(".agregar-carrito").forEach(peliculaBtn => {
        peliculaBtn.addEventListener("click", agregarPelicula);
    })
    document.querySelectorAll(".eliminar-carrito").forEach(peliculaBtn => {
        peliculaBtn.addEventListener("click", eliminarPelicula);
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
            Toastify({
                text: "Agregaste la película: " + peliculaSeleccionada.nombre,
                duration: 2000,
                gravity:'top',
                position: 'left',
                style: {background:'linear-gradient(to right, #54af7f, #0cd366'}
                }).showToast();
            let botonAgregar = document.getElementById(peliculaSeleccionada.id);
            botonAgregar.style.display = "none";
            let botonEliminar = document.getElementById("remove-" + peliculaSeleccionada.id);
            botonEliminar.style.display = "inline-block";
        }
        else {
                Swal.fire({
                    text: 'No hay stock de la pelicula seleccionada.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
        }
    }
}

//Eliminar producto del carrito.
function eliminarPelicula(e) {
    e.preventDefault();
    if (e.target.classList.contains("eliminar-carrito")) {
        const peliculaSeleccionada = obtenerPeli(e.target.id.replace('remove-',''));
        carrito = carrito.filter(pelicula => pelicula.id != peliculaSeleccionada.id);
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
        cantidadProdBadge.textContent = carrito.length;
        let botonAgregar = document.getElementById(peliculaSeleccionada.id);
        botonAgregar.style.display = "inline-block";
        let botonEliminar = document.getElementById("remove-" + peliculaSeleccionada.id);
        botonEliminar.style.display = "none";
        Toastify({
            text: "Eliminaste la película: " + peliculaSeleccionada.nombre + " del carrito",
            duration: 2000,
            gravity:'top',
            position: 'left',
            style: {background:'linear-gradient(to right, #ff0000, #ff1427'}
            }).showToast();
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

