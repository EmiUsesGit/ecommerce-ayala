// Desafío: Simulador Interactivo

let nombre = prompt("Por favor, ingresa tu nombre");
let apellido = prompt("Por favor, ingresa tu apellido");
let nombreCompleto = nombre + " " + apellido;
let nota1 = parseInt (prompt("Por favor, ingresa tu primera nota de la materia"));
let nota2 = parseInt (prompt("Por favor, ingresa tu segunda nota de la materia"));
let nota3 = parseInt (prompt("Por favor, ingresa tu tercera nota de la materia"));

function calcularNota(nota1, nota2, nota3) {
    total = nota1 + nota2 + nota3;
    total = total/3;
    return total;
}

alert(calcularNota(nota1, nota2, nota3));

if (total === 10) {
    alert (nombreCompleto + " " + "tu nota fue de: " + total + " ¡Aprobaste con sobresaliente, felicidades!")
} else if (promedio > 6) {
    alert (nombreCompleto + " " + "tu nota fue de: " + total + " ¡Aprobaste, felicidades!")
} else {
    alert (nombreCompleto + " " + "tu nota fue de: " + total + ". Lo siento, vas a tener que rendir...")
}
