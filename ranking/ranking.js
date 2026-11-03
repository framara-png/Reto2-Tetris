import { getSession, logOut, ranking,clearRanking} from "../logica/logicaJS.js";

let usuario = getSession();
let btnHome = document.querySelector(".atras");
let btnLogOut = document.querySelector(".logOut");
let btnLimpiar = document.querySelector(".limpiar");
let copia = [...ranking];
let ordenato = copia.sort((a,b) => b.partida.puntuacion - a.partida.puntuacion).slice(0,10);


let containrRanking = document.querySelector(".ranking");


for (let i = 0; i < ordenato.length; i++) {
    containrRanking.innerHTML += "<h3> Usuario: " + ordenato[i].usuario.username + "</h3>" +
     "<h3> fecha: " + ordenato[i].partida.fecha + "</h3>" +
        "<h3> puntos: " + ordenato[i].partida.puntuacion + "</h3>";
}
 


btnLogOut.addEventListener("click", function(){
logOut();
window.location.href = "../inicio/inicio.html";


});

btnHome.addEventListener("click", function(){
window.location.href = "../inicio/inicio.html";
});   



btnLimpiar.addEventListener("click", function(){
clearRanking(usuario);
window.location.reload();
});