export let usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [
    {
        username: "ana", email: "ana@gmail.com", password: "anaciao",
        record: [
            { fecha: "20/10/2026 14:32:10", puntuacion: 1 },
            { fecha: "21/10/2026 15:40:22", puntuacion: 1 },
            { fecha: "22/10/2026 18:15:45", puntuacion: 1 },
            { fecha: "23/10/2026 11:22:03", puntuacion: 1 },
            { fecha: "24/10/2026 09:05:14", puntuacion: 1 },
            { fecha: "25/10/2026 16:30:55", puntuacion: 1 },
            { fecha: "26/10/2026 19:12:01", puntuacion: 1 },
            { fecha: "27/10/2026 13:44:18", puntuacion: 1 },
            { fecha: "28/10/2026 21:02:37", puntuacion: 1 },
            { fecha: "29/10/2026 10:15:00", puntuacion: 1 },
            { fecha: "30/10/2026 17:50:26", puntuacion: 1},
            { fecha: "31/10/2026 22:11:09", puntuacion: 1 },
            { fecha: "01/11/2026 12:00:04", puntuacion: 1 }
        ]
    },
    {
        username: "paolo", email: "paolo@gmail.com", password: "paolocaio",
        record: [
            { fecha: "20/10/2026 11:05:21", puntuacion: 48 },
            { fecha: "21/10/2026 13:12:40", puntuacion: 15 },
            { fecha: "22/10/2026 21:40:12", puntuacion: 8 },
            { fecha: "23/10/2026 16:18:00", puntuacion: 41 },
            { fecha: "24/10/2026 23:55:14", puntuacion: 19 },
            { fecha: "25/10/2026 10:22:31", puntuacion: 33 },
            { fecha: "26/10/2026 14:05:59", puntuacion: 52 },
            { fecha: "27/10/2026 17:48:12", puntuacion: 60 },
            { fecha: "28/10/2026 19:30:25", puntuacion: 24 },
            { fecha: "29/10/2026 08:15:44", puntuacion: 37 },
            { fecha: "30/10/2026 20:02:11", puntuacion: 45 },
            { fecha: "31/10/2026 22:50:03", puntuacion: 58 },
            { fecha: "01/11/2026 15:33:20", puntuacion: 66 }
        ]
    },
    {
        username: "pino", email: "pino@gmail.com", password: "pinociao",
        record: [
            { fecha: "20/10/2026 10:12:33", puntuacion: 5 },
            { fecha: "21/10/2026 11:45:12", puntuacion: 14 },
            { fecha: "22/10/2026 13:04:50", puntuacion: 22 },
            { fecha: "23/10/2026 16:20:15", puntuacion: 19 },
            { fecha: "24/10/2026 18:35:40", puntuacion: 31 },
            { fecha: "25/10/2026 20:11:02", puntuacion: 28 },
            { fecha: "26/10/2026 09:50:17", puntuacion: 42 },
            { fecha: "27/10/2026 12:15:33", puntuacion: 37 },
            { fecha: "28/10/2026 15:22:49", puntuacion: 51 },
            { fecha: "29/10/2026 17:04:01", puntuacion: 49 },
            { fecha: "30/10/2026 19:40:55", puntuacion: 56 },
            { fecha: "31/10/2026 21:18:23", puntuacion: 60 },
            { fecha: "01/11/2026 14:02:10", puntuacion: 68 }
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
    let rankingUser = usuariosRegistrados.find(usuario => usuario.username === username);
    if (rankingUser) {

        return rankingUser.record;
    } else {
        return [];
    }

}


export function addRanking(username, puntuacion) {
let ahora = new Date();
    let data = ahora.toLocaleDateString("es-ES");
    let orario =  ahora.toLocaleTimeString("es-ES");
    //concatenazione di string //
    let fecha = `${data} ${orario}`;
    let rankingUser = usuariosRegistrados.find(usuario => usuario.username === username);
    
    if (rankingUser) {
    let puntuacionMasBaja = Math.min(...rankingUser.record.map(r => r.puntuacion));
        if (puntuacionMasBaja < puntuacion) {
            for (let i = 0; i < rankingUser.record.length; i++) {
                if (rankingUser.record[i].puntuacion === puntuacionMasBaja) {
                    rankingUser.record.splice(i, 1);
                    rankingUser.record.push({ fecha, puntuacion });
                    localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
                    // anado el break porque asi no borro eventuales duplicados y añado dos veces el mismo record. 
                    break;
                    
                }

            }
        }
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
    let rankingUser = usuariosRegistrados.find(usuario => usuario.username === username);
    if (rankingUser) {
        rankingUser.record = []
        localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
    }
}