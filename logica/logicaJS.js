class usuario {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}


class partida {
    constructor(fecha, puntuacion) {
        this.puntuacion = puntuacion;
        this.fecha = fecha;

    }
}

let partidaAna = new partida("22/10/2026 14:32:10", 1);
let partidaPino = new partida("25//2026 10:12:33", 5);
let partdiaPaolo = new partida("20/9/2026 11:05:21", 48);

let user1 = new usuario("ana", "ana@gmail.com", "anaciao");
let user2 = new usuario("paolo", "paolo@gmail.com", "paolociao");
let user3 = new usuario("pino", "pino@gmail.com", "pinociao");
export let ranking = JSON.parse(localStorage.getItem("ranking")) || [
    { usuario: user1, partida: partidaAna },
    { usuario: user2, partida: partdiaPaolo },
    { usuario: user3, partida: partidaPino } 
];

export let usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [
    user1, user2, user3
];




export function verificaDatos(user, email, password) {
    let tieneNumero = /\d/.test(password);
    let tieneSimbolo = /[!@#$%^&*]/.test(password);

    if (usuariosRegistrados.some(usuario => usuario.username.toLowerCase() === user.toLowerCase())) {
        alert("usuario ya registrado. Porfavor seleciona otro");
        return false;
    } else if (usuariosRegistrados.some(usuario => usuario.email.toLowerCase() === email.toLowerCase())) {
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


export function loginUser(user, password) {
    if (usuariosRegistrados.some(usuario => usuario.username.toLowerCase() === user.toLowerCase() && usuario.password === password)) {
        return true;
    } else {
        return false;
    }
}



export function loginMail(mail, password) {
    if (usuariosRegistrados.some(usuario => usuario.email.toLowerCase() === mail.toLowerCase() && usuario.password === password)) {
        return true;
    } else {
        return false;
    }
}





export function addRanking(username, puntuacion) {
    let ahora = new Date();
    let data = ahora.toLocaleDateString("es-ES");
    let orario = ahora.toLocaleTimeString("es-ES");
    //concatenazione di string //
    let fecha = `${data} ${orario}`;
    let nuevaPartida = new partida(fecha, puntuacion);

    let usuarioGiocante = usuariosRegistrados.find(usuario => usuario.username === username);

    let puntuaciones = ranking.map(elemento => elemento.partida.puntuacion);
    let nuevoRegistro = {
        usuario : usuarioGiocante,
        partida : nuevaPartida
    };
    
    let puntuacionMasbaja = Math.min(...puntuaciones);

    if (ranking.length < 10) {
        ranking.push(nuevoRegistro );
        localStorage.setItem("ranking", JSON.stringify(ranking));
    }

    else if (puntuacionMasbaja < puntuacion) {
        let indexPeor = ranking.findIndex(elemento => elemento.partida.puntuacion === puntuacionMasbaja);

        ranking.splice(indexPeor, 1);
        ranking.push( nuevoRegistro );
        localStorage.setItem("ranking", JSON.stringify(ranking));



    } else {
        alert("das asco");
    }

}






export function setSession(username) {
    localStorage.setItem("usuarioLogeado", username);

}

export function getSession() {
    return localStorage.getItem("usuarioLogeado");
}


export function logOut() {
    localStorage.removeItem("usuarioLogeado");
}


export function clearRanking(username) {
for(let i = 0; i < ranking.length; i ++){
    if(ranking[i].usuario.username === username){
        ranking.splice(i,1);
        i--;
       
    }

}
     localStorage.setItem("ranking", JSON.stringify(ranking));
}