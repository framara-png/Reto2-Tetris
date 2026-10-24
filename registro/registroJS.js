

import { setSession, verificaDatos } from "../logica/logicaJS.js";

document.forms["miFormulario"].addEventListener("submit", function (para) {
    para.preventDefault();

    let nombreUs = document.forms["miFormulario"]["nom"].value;
    let emailUs = document.forms["miFormulario"]["mail"].value;
    let passUs = document.forms["miFormulario"]["pass"].value;

    let datosOk = verificaDatos(nombreUs, emailUs, passUs);

    if (datosOk) {
        setSession(nombreUs);
        alert("BIENVENIDO " + nombreUs);
        window.location.href = "../home/home.html"; 

    }


});




