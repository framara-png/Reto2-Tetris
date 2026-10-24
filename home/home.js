import { getSession, logOut} from "../logica/logicaJS.js"


let usuario = getSession();


let btnLog = document.querySelector(".login");
let btnReg = document.querySelector(".registrarse"); 
let btnPerf = document.querySelector(".perfil");
let btnLogOut  = document.querySelector(".logOut"); 


if (usuario) {
    btnLog.style.display = "none";
    btnReg.style.display ="none";
    btnPerf.style.display ="";
    btnLogOut.style.display = ""; 

}    else {
       btnLog.style.display = "";
    btnReg.style.display ="";
    btnPerf.style.display ="none";
    btnLogOut.style.display = "none";  
    }

btnLogOut.addEventListener('click', function(){
logOut();
window.location.reload();

});

btnLog.addEventListener('click', function () {
  window.location.href = "../login/login.html";
});


btnReg.addEventListener("click", function () {
  window.location.href = "../registro/registroHtml.html";
});