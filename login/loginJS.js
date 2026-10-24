import { setSession, login } from "../logica/logicaJS.js";





document.forms["formLog"].addEventListener("submit", function (para) {
    para.preventDefault();

    let usuario = document.forms["formLog"]["userLog"].value;
    let password = document.forms["formLog"]["userPass"].value;

    let log = login(usuario, password);

    if (log) {
        setSession(usuario);
        window.location.href = "/../home/home.html";
    } else {
        alert("aceso Denegado");
    }




});