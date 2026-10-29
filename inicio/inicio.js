import { getSession, setSession,logOut } from "../logica/logicaJS.js";

let btnInicio = document.querySelector(".iniciarSes");

let btnReg = document.querySelector(".registro");

let btnPer = document.querySelector(".perfil");

let btnLogOut = document.querySelector(".logOut");

btnLogOut.addEventListener("click", function(){
    logOut();
    window.location.reload();
});

btnInicio.addEventListener("click", function(){
window.location.href = "../login/login.html";
});


btnReg.addEventListener("click", function(){
window.location.href ="../registro/registroHTML.html";
});

btnPer.addEventListener("click", function(){
window.location.href="../perfil/perfil.html";
});



let usuario = getSession();

if(usuario){
btnInicio.style.display = "none";
btnReg.style.display = "none";
btnPer.style.display = "";
btnLogOut.style.display = "";

}else {
    btnInicio.style.display = "";
btnReg.style.display = "";
btnPer.style.display = "none";
btnLogOut.style.display = "none";
}

const contador = document.getElementById("contador-partidas");

let partidas = Number(sessionStorage.getItem("partidas")) || 0;

contador.textContent = "PARTIDAS JUGADAS: " + partidas;


function aumentarPartidas() {

    partidas++;

    sessionStorage.setItem("partidas", partidas);

    contador.textContent = "PARTIDAS JUGADAS: " + partidas;

}


// ===================================
// BOTÓN JUGAR AHORA
// ===================================

const botonJugar = document.getElementById("btn-jugar");

botonJugar.addEventListener("click", function () {

    if (!usuario) {

        alert("Es obligatorio iniciar sesión o registrarse para jugar.");

        return;

    }

    aumentarPartidas();

    window.location.href = "../juego/juego.html";

});


// ===================================
// NAVEGACIÓN
// ===================================




function verPuntuaciones() {

    window.location.href = "puntuaciones.html";

}


function comoJugar() {

    window.location.href = "como-jugar.html";

}

