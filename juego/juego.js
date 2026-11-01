let pieza1 = [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0]

];

let pieza3 = [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1]
]

let pieza4 = [
    [0, 1, 1],
    [0, 1, 0],
    [1, 1, 0]
]


let pieza2 = [
    [0,0 ,0 ],
    [1, 1, 1],
    [0, 0, 0]

]

function getRandomColor() {
    let color;
    let colorArray = [
        "#FF6633",
        "#FFB399",
        "#FF33FF",
        "#FFFF99",
        "#00B3E6",
        "#E6B333",
        "#999966",
        "#809980",
        "#E6FF80",
        "#1AFF33",
        "#999933",
        "#FF3380",
        "#CCCC00",
        "#66E64D",
        "#FF4D4D",
        "#99E6E6",

    ];

    color = colorArray[tirar_dado(colorArray.length)];

    return color;
}
let divGameOver = document.querySelector(".GameOver");
let divPunt = document.querySelector(".puntuacion");
let puntuacion = 0;
let pausa = false;
//let piezas = [pieza2];
let piezas = [pieza1, pieza2, pieza3, pieza4];
const canvas = document.getElementById('tetris');
let piezaSucc = document.getElementById('piezaSucc');

let contextPieza = piezaSucc.getContext('2d');
const context = canvas.getContext('2d');
let pieza = selezionar_pieza(piezas);
let colorPieza = getRandomColor();
let nuevaPieza = selezionar_pieza(piezas);
let nuevoColorNuePie = getRandomColor();
console.log(nuevoColorNuePie);
// Escalamos el canvas para trabajar con una cuadrícula de 10x20 (cada bloque mide 20px)
context.scale(20, 20);
contextPieza.scale(20,20);
const COLUMNAS = 10;
const FILAS = 20;

// 1. CREAR EL TABLERO (Matriz de 10x20 llena de ceros)
const tablero = Array.from({ length: FILAS }, () => Array(COLUMNAS).fill(0));
let velocidad = 1000;
let timer = setInterval(bajarPieza, velocidad);




function tirar_dado(n) {
    return Math.floor(Math.random() * n);
}

function selezionar_pieza(p = []) {
    return p[tirar_dado(p.length)];
}

// Posición de la pieza
let pos = { x: 3, y: 0 };
let nuevaPos = {x : 1, y : 1 };

// 3. FUNCIÓN PARA DIBUJAR COSAS
function dibujarMatriz(matriz, posicion, color, contesto) {
    matriz.forEach((fila, y) => {
        fila.forEach((valor, x) => {
            if (valor !== 0) {
                let colorFinal;
                if (typeof valor == 'string') {
                    colorFinal = valor;

                } else {
                    colorFinal = color;
                }

                contesto.fillStyle = colorFinal;
                contesto.fillRect(x + posicion.x, y + posicion.y, 1, 1)
            }

        });
    });
}

// 4. RENDERIZADO PRINCIPAL
function dibujar() {
    // Limpiamos el canvas en cada frame
    context.fillStyle = '#111';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujamos el tablero (bloques fijos) y la pieza actual
    dibujarMatriz(tablero, { x: 0, y: 0 }, colorPieza, context);


    dibujarMatriz(pieza, pos, colorPieza, context);
}
function dibujarSiguente() {
    contextPieza.fillStyle = '#111';
    contextPieza.fillRect(0, 0, piezaSucc.width, piezaSucc.height);
    dibujarMatriz(tablero, { x: 0, y: 0 }, nuevoColorNuePie, contextPieza);
    dibujarMatriz(nuevaPieza, nuevaPos, nuevoColorNuePie, contextPieza);

}
// 5. ROTACIÓN ULTRA SIMPLE
function girarMatriz() {
    // Transponer la matriz
    for (let y = 0; y < pieza.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [pieza[x][y], pieza[y][x]] = [pieza[y][x], pieza[x][y]];
        
        }
    
    }
    // Invertir las filas
    pieza.forEach(fila => fila.reverse());
}

function rotar(){
   girarMatriz();
    if (chocar(pieza,pos.x,pos.y)===true){
        for (let i = 0; i < 3; i++){
            girarMatriz();
        }


    }
}

// 6. CONTROLES
document.addEventListener('keydown', event => {

    if (event.key === " ") {
        if (pausa === false) {
            pausa = true
        } else {
            pausa = false;
        }
    }

    if (event.key === "ArrowLeft") {
        if (pausa === true) {
            return;
        }

        if (chocar(pieza, pos.x - 1, pos.y) == false) {
            pos.x--;
        }
    }

    if (event.key === 'ArrowRight') {
        if (pausa === true) {
            return;
        }

        if (chocar(pieza, pos.x + 1, pos.y) == false)
            pos.x++;
    }
    if (event.key === 'ArrowDown') {
        if (pausa === true) {
            return;
        }

        if (chocar(pieza, pos.x, pos.y + 1) == false)
            pos.y++;
    }  // Caída rápida
    if (event.key === 'ArrowUp') {
        if (pausa === true) {
            return;
        }

        rotar();
    }
    dibujar();
});



function destruirFilas() {
    for (let y = FILAS - 1; y >= 0; y--) {
        if (tablero[y].every(casilla => casilla !== 0)) {
            tablero.splice(y, 1);
            tablero.unshift(Array(COLUMNAS).fill(0));
            // aumentamos nuovamente la variable y porque necesitamos que vuelva a controlar la fila que baja, en principo pensaba que habia el riesgo //
            // de quedar atrapado en un buqule infinido pero me he dedo cuenta que se lanza solo si se cumple la condicion//
            y++;
            puntuacion++;
            if (puntuacion % 10 === 0 && puntuacion != 0) {
                velocidad = Math.max(200, velocidad - 200);
                clearInterval(timer);
                timer = setInterval(bajarPieza, velocidad);
            }
            divPunt.innerHTML = "<p> puntuacion: " + puntuacion + "</p>";
        }
    }


}


function chocar(matrizPieza, futuraX, futuraY) {
    for (let y = 0; y < matrizPieza.length; y++) {
        for (let x = 0; x < matrizPieza[y].length; ++x) {
            let valorPieza = matrizPieza[y][x];
            if (valorPieza !== 0) {
                let tableroX = futuraX + x;
                let tableroY = futuraY + y;
                if (tableroX < 0 || tableroX >= COLUMNAS || tableroY >= FILAS || tablero[tableroY][tableroX] !== 0) {
                    return true
                }
            }
        }
    }
    return false;
}

function gameOver() {
    if (chocar(pieza, pos.x, pos.y) == true) {

        divGameOver.innerHTML = "<p> GAME OVER MANITOOO </p>" +
            "<p> tu puntuacion es " + puntuacion + "</p>";

        return false;
    } else {
        return true;
    }
}




// 7. GRAVEDAD AUTOMÁTICA

function bajarPieza() {

    if (gameOver() === false) {
        return;
    }
    else if (pausa === true) {
        return;
    }


    else if (chocar(pieza, pos.x, pos.y + 1) == true) {
        pieza.forEach((fila, y) => {
            fila.forEach((valor, x) => {

                if (valor !== 0) {
                    tablero[pos.y + y][pos.x + x] = colorPieza;
                }
            });
        });
        colorPieza = nuevoColorNuePie;
        pieza = nuevaPieza;
        nuevaPieza = selezionar_pieza(piezas);
        nuevoColorNuePie = getRandomColor();
        dibujarSiguente();
        pos.y = 0;
        pos.x = 3;

    } else {
        pos.y++;
    }
    destruirFilas();
    dibujar();

}






// Dibujo inicial


dibujar();
dibujarSiguente();
