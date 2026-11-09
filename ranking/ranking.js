import { getSession, logOut, ranking,clearRanking} from "../logica/logicaJS.js";

let usuario = getSession();
let btnHome = document.querySelector(".atras");
let btnLogOut = document.querySelector(".logOut");
let btnLimpiar = document.querySelector(".limpiar");
let copia = [...ranking];
let ordenato = copia.sort((a,b) => b.partida.puntuacion - a.partida.puntuacion).slice(0,10);


let containrRanking = document.querySelector(".ranking");
let tablaDoom = document.createElement("table");
tablaDoom.border = 1; 
let tableElements ="";
tableElements += "<tr>" 
+"<th><h2> Usuario</h2></th>"
+"<th> <h2> Fecha </h2> </th>"
+"<th> <h2> Puntuacion</h2> </th>"
+ "</tr>"; 
for (let i = 0; i < ordenato.length; i++) {
     tableElements+= "<tr>" +
     "<td> <h3>" + ordenato[i].usuario.username + "</h3> </td>" +
     "<td> <h3> " + ordenato[i].partida.fecha + " </h3></td>" +
        "<td> <h3>" + ordenato[i].partida.puntuacion + " </h3></td>"+
        "</tr>";
}
tablaDoom.innerHTML += tableElements; 
containrRanking.appendChild(tablaDoom);


btnLogOut.addEventListener("click", function(){
logOut();
window.location.href = "../inicio/inicio.html";


});

btnHome.addEventListener("click", function(){
window.location.href = "../inicio/inicio.html";
});   



btnLimpiar.addEventListener("click", function(){
clearRanking(usuario.username);
window.location.reload();
});