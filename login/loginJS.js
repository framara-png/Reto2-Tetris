import { setSession, loginUser, loginMail } from "../logica/logicaJS.js";


let errorDiv = document.querySelector(".errores");
let btnReg = document.querySelector(".registrarse");
let btnHome = document.querySelector(".atras");
document.forms["formLog"].addEventListener("submit", function (para) {
    para.preventDefault();

    let usuario = document.forms["formLog"]["userLog"].value;
    let password = document.forms["formLog"]["userPass"].value;
    let log = null;
    if (usuario.includes("@")) {
        log = loginMail(usuario, password);
    } else {
        log = loginUser(usuario, password);
    }




    if (log) {
        // si se logea con mail i set session guardara el mail del usuario no el user, posible problema en futuro para guardar el record?//
        
        setSession(usuario);
        window.location.href = "/../home/home.html";
    } else {
        errorDiv.innerHTML = "<p> Error: password o user incorrecto</p>";
    }

});

btnReg.addEventListener("click", function(){
window.location.href ="../registro/registroHtml.html";
}); 

btnHome.addEventListener("click", function(){
window.location.href ="../home/home.html";
});