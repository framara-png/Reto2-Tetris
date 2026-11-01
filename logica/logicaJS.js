
export let usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [
    {
        username: "ana", email: "ana@gmail.com", password: "anaciao",
        record: [
            { fecha: "28/10/2026", puntuacion: 12 },
            { fecha: "30/10/2026", puntuacion: 35 },
            { fecha: "01/11/2026", puntuacion: 27 }
        ]
    },
    {
        username: "paolo", email: "paolo@gmail.com", password: "paolocaio",
        record: [
            { fecha: "29/10/2026", puntuacion: 48 },
            { fecha: "31/10/2026", puntuacion: 8 },
            { fecha: "01/11/2026", puntuacion: 41 },
            { fecha: "01/11/2026", puntuacion: 19 }
        ]
    },
    {
        username: "pino", email: "pino@gmail.com", password: "pinociao",
        record: [
            { fecha: "27/10/2026", puntuacion: 5 },
            { fecha: "01/11/2026", puntuacion: 22 }
        ]
    }
];


export function verificaDatos(user, email, password, record) {
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
        usuariosRegistrados.push({ username: user.trim(), email: email.trim(), password: password, record: record });
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


export function getRanking(username) {
    let rankingUser = usuariosRegistrados.find(usuario => usuario.username === username)
    if (rankingUser) {

        return rankingUser.record;
    } else {
        return [];
    }

}


export function addRanking(username, puntuacion) {
    let fecha = new Date().toISOString("es-E");
    let rankingUser = usuariosRegistrados.find(usuario => usuario.username === username)
    if (rankingUser) {

        rankingUser.record.push({ fecha, puntuacion });
        localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
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