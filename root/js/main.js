// Desafío: Simulador Interactivo

let nombre = prompt("Por favor, ingresa tu nombre");
let apellido = prompt("Por faovr, ingresa tu apellido");
let nota1 = parseInt (prompt("Por favor, ingresa tu primera nota"));
let nota2 = parseInt (prompt("Por favor, ingresa tu segunda nota"));
let nota3 = parseInt (prompt("Por favor, ingresa tu tercer nota"));

let listaNotas = [nota1, nota2, nota3];

function operacionNotas(listaNotas) {
    let operacionNotas = 0;
    for (let i = 0; i < 3; i++) {
    operacionNotas += listaNotas
    }
    return operacionNotas;
}

let operador = operacionNotas(listaNotas);

function sacarPromedio(operador) {
    let promedio = Math.round(operador/3);
    return promedio;
}

let promedio1 = sacarPromedio(operador);

if (promedio1 > 6) {
    alert("Felicidades" + " " + nombre + " " + apellido + " ¡Aprobaste con sobresaliente!");
} else {
    alert("Lo siento," + " " + nombre + " " + apellido + ", desaprobaste la materia...");
}
