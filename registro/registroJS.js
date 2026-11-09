

import { setSession, verificaDatos,} from "../logica/logicaJS.js";
let btnHome = document.querySelector(".atras");
document.forms["miFormulario"].addEventListener("submit", function (para) {
    para.preventDefault();

    let nombreUs = document.forms["miFormulario"]["nom"].value;
    let emailUs = document.forms["miFormulario"]["mail"].value;
    let passUs = document.forms["miFormulario"]["pass"].value;
    let datosOk = verificaDatos(nombreUs, emailUs, passUs);
let nuevoUser = new usuario (nombreUs,emailUs,passUs);
    if (datosOk) {
        setSession(nuevoUser);
        alert("BIENVENIDO " + nombreUs);
        window.location.href = "../inicio/inicio.html"; 

    }


});




btnHome.addEventListener("click", function(){
window.location.href ="../inicio/inicio.html";
});