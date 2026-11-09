import { getSession, } from "../logica/logicaJS.js";

 let   usuario =  getSession();
    console.log(usuario);
    cargarDatosUsuario();
document.addEventListener("DOMContentLoaded", () => {
    // 1. CARGAR DATOS Y ESTADÍSTICAS AL ENTRAR
    


    // 2. GESTIONAR EL FORMULARIO DE EDITAR PERFIL (#inscription)
    const formulario = document.getElementById("inscription");

    if (formulario) {
        formulario.addEventListener("submit", function (e) {
            e.preventDefault(); // Evita que la página se recargue

            const nombreInput = document.getElementById("nombre").value;
            const emailInput = document.getElementById("email").value;
            const passwordInput = document.getElementById("password").value;
            const passwordRepitInput = document.getElementById("passwordRepit").value;

            // Validar que las contraseñas coincidan
            if (passwordInput !== passwordRepitInput) {
                alert("Las contraseñas no coinciden. Por favor, revísalas.");
                return;
            }

            // Guardar los datos actualizados en localStorage
          
          
          
            localStorage.setItem("usuario_nombre", nombreInput);
            localStorage.setItem("usuario_email", emailInput);
            localStorage.setItem("usuario_password", passwordInput);

            alert("¡Perfil actualizado con éxito!");

            // Refrescar los datos en pantalla instantáneamente
            cargarDatosUsuario();
        });
    }

    // 3. BOTÓN DE VER MEJORES RANKINGS
    const botonRanking = document.querySelector(".boton-ranking");
    if (botonRanking) {
        botonRanking.addEventListener("click", () => {
            window.location.href = "../ranking/ranking.html";
        });
    }
});

/**
 * Función para sincronizar las estadísticas y datos del usuario con el HTML
 */
function cargarDatosUsuario() {
    // Obtener valores guardados o usar valores por defecto
    const nombreUsuario = usuario.username; 
    const emailUsuario =  usuario.email;
    const passwordUsuario = usuario.password;
    // Partidas jugadas (conectado con tu sessionStorage / localStorage del inicio)
    const partidasJugadas = sessionStorage.getItem("partidas") || localStorage.getItem("partidas") || 0;
    
   

   
    const h3Usuario = document.querySelector(".usuario-central h3");
    if (h3Usuario) {
        h3Usuario.textContent = "@" + nombreUsuario;
    }

    // RELLENAR LOS INPUTS DEL FORMULARIO CON LOS DATOS ACTUALES
    const inputNombre = document.getElementById("nombre");
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");
    const inputPasswordRepit = document.getElementById("passwordRepit");

    if (inputNombre && !inputNombre.value) inputNombre.value = nombreUsuario;
    if (inputEmail && !inputEmail.value) inputEmail.value = emailUsuario;
    if (inputPassword && !inputPassword.value) inputPassword.value = passwordUsuario;
    if (inputPasswordRepit && !inputPasswordRepit.value) inputPasswordRepit.value = passwordUsuario;
}

// 4. FUNCIONES DE NAVEGACIÓN DEL HEADER
function volverAtras() {
    window.location.href = "../inicio/inicio.html";
}

function editarDatos() {
    // Hace scroll suave hacia el formulario de edición por si está más abajo
    const seccionFormulario = document.getElementById("inscription");
    if (seccionFormulario) {
        seccionFormulario.scrollIntoView({ behavior: "smooth" });
    } 

}