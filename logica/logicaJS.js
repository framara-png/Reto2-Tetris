
export let usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [
  { username: "ana", email: "ana@gmail.com" ,password: "anaciao" },
  { username: "paolo", email: "paolo@gmail.com" , password: "paolocaio" },
  { username: "pino", email: "pino@gmail.com" , password: "pinociao" }
];







export function verificaDatos(user, email, password) {
let tieneNumero = /\d/.test(password);
let tieneSimbolo = /[!@#$%^&*]/.test(password);

    if (usuariosRegistrados.some(usuario => usuario.username.toLowerCase() === user)) {
        alert("usuario ya registrado. Porfavor seleciona otro");
        return false;
    } else if (usuariosRegistrados.some(usuario => usuario.email.toLowerCase() === email)) {
        alert("Email ya registrda, porfavor utiliza otra");
        return false;
    } else if (password.length < 8) {
        alert("password minimo di 8 caratteri");
        return false;
    } else if (!tieneNumero) {
        alert("la pass tiene que tener almeno un numero");
        return false;
    } else if (!tieneSimbolo) {
        alert("la pass tiene que tener por lo meno un caracter especial");
        return false;
    }
    else {
        usuariosRegistrados.push({ username: user.trim(), email: email.trim(), password: password });
        localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
        return true;
    }
} 


export function login(user, password) {
    if (usuariosRegistrados.some(usuario => usuario.username.toLowerCase() === user && usuario.password === password)) {
        return true;
    } else {
    return false; 
    }
}   


export function setSession(username) {
localStorage.setItem("usuarioLogeado", username); 

} 

export function getSession() {
    return localStorage.getItem("usuarioLogeado"); 
} 


export function logOut () {
localStorage.removeItem("usuarioLogeado");
}