import { getSession, logOut, getRanking, } from "../logica/logicaJS.js";

let usuario = getSession();

let rankingUsuario = getRanking(usuario);
let copia = [...rankingUsuario];
let ordenato = copia.sort((a,b) => b.puntuacion - a.puntuacion).slice(0,10);


let containrRanking = document.querySelector(".ranking");


for (let i = 0; i < ordenato.length; i++) {
    containrRanking.innerHTML += "<h3> fecha: " + ordenato[i].fecha + "</h3>" +
        "<h3> puntos: " + ordenato[i].puntuacion + "</h3>";
}
