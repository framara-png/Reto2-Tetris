
// CONTADOR DE PARTIDAS

const contador = document.getElementById("contador-partidas");

let partidas = Number(sessionStorage.getItem("partidas")) || 0;

contador.textContent = "PARTIDAS JUGADAS: " + partidas;


function aumentarPartidas() {

    partidas++;

    sessionStorage.setItem("partidas", partidas);

    contador.textContent = "PARTIDAS JUGADAS: " + partidas;

}


// ===================================
// INICIO DE SESIÓN (TEMPORAL)
// ===================================

// Esta variable es provisional.
// Más adelante la conectaremos con el sistema de usuarios.

let usuarioLogueado = false;


// ===================================
// BOTÓN JUGAR AHORA
// ===================================

const botonJugar = document.getElementById("btn-jugar");

botonJugar.addEventListener("click", function () {

    if (!usuarioLogueado) {

        alert("Es obligatorio iniciar sesión o registrarse para jugar.");

        return;

    }

    aumentarPartidas();

    window.location.href = "juego.html";

});


// ===================================
// NAVEGACIÓN
// ===================================

function iniciarSesion() {

    window.location.href = "usuario.html?modo=login";

}


function registrarse() {

    window.location.href = "../registro/registroHtml.html";

}


function verPuntuaciones() {

    window.location.href = "puntuaciones.html";

}


function comoJugar() {

    window.location.href = "como-jugar.html";

}


// ===================================
// SELECTOR DE IDIOMA
// ===================================

function cambiarIdioma() {

    const idioma = document.getElementById("idioma").value;

    if (idioma === "es") {

        alert("Has seleccionado español.");

    } else {

        alert("You have selected English.");

    }

}
