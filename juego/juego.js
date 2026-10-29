let pieza1 = [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0]

];


let pieza2 = [
    [1, 1, 1],
    [0, 0, 0],
    [0, 0, 0]

]

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


let piezas = [pieza1, pieza2, pieza3, pieza4];
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
let pieza = selezionar_pieza(piezas);
let colorPieza = getRandomColor();
// Escalamos el canvas para trabajar con una cuadrícula de 10x20 (cada bloque mide 20px)
context.scale(20, 20);

const COLUMNAS = 10;
const FILAS = 20;

// 1. CREAR EL TABLERO (Matriz de 10x20 llena de ceros)
const tablero = Array.from({ length: FILAS }, () => Array(COLUMNAS).fill(0));



function tirar_dado(n) {
    return Math.floor(Math.random() * n);
}

function selezionar_pieza(p = []) {
    return p[tirar_dado(p.length)];
}

// Posición de la pieza
let pos = { x: 3, y: 0 };

// 3. FUNCIÓN PARA DIBUJAR COSAS
function dibujarMatriz(matriz, posicion, color) {
    let colorFinal;
    matriz.forEach((fila, y) => {
        fila.forEach((valor, x) => {
            if (valor !== 0) {
                let colorFinal;
                if (typeof valor == 'string') {
                    colorFinal = valor;

                } else {
                    colorFinal = color;
                }

                context.fillStyle = colorFinal;
                context.fillRect(x + posicion.x, y + posicion.y, 1, 1)
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
    dibujarMatriz(tablero, { x: 0, y: 0 }, colorPieza);


    dibujarMatriz(pieza, pos, colorPieza);
}

// 5. ROTACIÓN ULTRA SIMPLE
function rotar() {
    // Transponer la matriz
    for (let y = 0; y < pieza.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [pieza[x][y], pieza[y][x]] = [pieza[y][x], pieza[x][y]];
        }
    }
    // Invertir las filas
    pieza.forEach(fila => fila.reverse());
}

// 6. CONTROLES
document.addEventListener('keydown', event => {


    if (event.key === "ArrowLeft") {
        if (chocar(pieza, pos.x - 1, pos.y) == false) {
            pos.x--;
        }
    }

    if (event.key === 'ArrowRight') {
        if (chocar(pieza, pos.x + 1, pos.y) == false)
            pos.x++;
    }
    if (event.key === 'ArrowDown') {
        if (chocar(pieza, pos.x, pos.y + 1) == false)
            pos.y++;
    }  // Caída rápida
    if (event.key === 'ArrowUp') rotar();
    dibujar();
});


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
// 7. GRAVEDAD AUTOMÁTICA
setInterval(() => {
    if (chocar(pieza, pos.x, pos.y + 1) == true) {
        pieza.forEach((fila, y) => {
            fila.forEach((valor, x) => {
                if (valor !== 0) {
                    tablero[pos.y + y][pos.x + x] = colorPieza;
                }
            });
        });
        colorPieza = getRandomColor();
        pieza = selezionar_pieza(piezas)
        pos.y = 0;
        pos.x = 3;

    } else {
        pos.y++;
    }
    dibujar();
}, 1000);

// Dibujo inicial
dibujar();
