// Desafío complementario: Algoritmo utilizando un ciclo

let nombre = prompt("Por favor, ingresa tu nombre");
let apellido = prompt("Por favor, ingresa tu apellido");
let nombreCompleto = nombre + " " + apellido;
let nota1 = parseInt (prompt("Por favor, ingresa tu primera nota de la materia"));
let nota2 = parseInt (prompt("Por favor, ingresa tu segunda nota de la materia"));
let nota3 = parseInt (prompt("Por favor, ingresa tu tercera nota de la materia"));

let notas = [nota1, nota2, nota3];
let sumarNotas = 0

for(let i = 0; i < 3; i++) {
    sumarNotas += notas[i];
}
let promedio = sumarNotas/3;
if (promedio === 10) {
    alert (nombreCompleto + " " + "tu nota fue de: " + promedio + " ¡Aprobaste con sobresaliente, felicidades!")
} else if (promedio > 6) {
    alert (nombreCompleto + " " + "tu nota fue de: " + promedio + " ¡Aprobaste, felicidades!")
} else {
    alert (nombreCompleto + " " + "tu nota fue de: " + promedio + ". Lo siento, vas a tener que rendir...")
}
