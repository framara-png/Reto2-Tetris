const COLUMNAS = 10;
const FILAS = 20;

const matrizTablero = Array.from({ length: FILAS }, () => Array(COLUMNAS).fill(0));

// 2. CONFIGURACIÓN DE LA PIEZA ACTUAL (Pieza en T)
let pieza = [,
 ,
    [0, 0, 0]
];

// Posición inicial de la pieza en el tablero (fila, columna)
let piezaX = 3; 
let piezaY = 0;

// 3. FUNCIÓN DE RENDERIZADO (Dibuja la matriz JS en el Grid CSS)
function dibujar() {
    const contenedor = document.getElementById('tablero');
    contenedor.innerHTML = ''; // Borramos el tablero anterior

    // Recorremos las 20 filas y 10 columnas
    for (let f = 0; f < FILAS; f++) {
        for (let c = 0; c < COLUMNAS; c++) {
            const celdaDiv = document.createElement('div');
            celdaDiv.classList.add('celda');

            // Si en la matriz del tablero hay un bloque fijo...
            if (matrizTablero[f][c] === 1) {
                celdaDiv.classList.add('bloque-activo');
            }

            // Si la pieza actual está pasando por esta posición, también la pintamos
            const piezaFila = f - piezaY;
            const piezaCol = c - piezaX;
            
            // Comprobamos si la celda actual coincide con el dibujo de nuestra pieza
            if (piezaFila >= 0 && piezaFila < pieza.length && 
                piezaCol >= 0 && piezaCol < pieza[piezaFila].length) {
                if (pieza[piezaFila][piezaCol] === 1) {
                    celdaDiv.classList.add('bloque-activo');
                }
            }

            contenedor.appendChild(celdaDiv);
        }
    }
}

// 4. FUNCIÓN MATEMÁTICA DE ROTACIÓN
function rotarPieza() {
    // Transponer y hacer reverse
    const nuevaPieza = pieza.map((_, i) => pieza.map(fila => fila[i]));
    pieza = nuevaPieza.map(fila => fila.reverse());
}

// 5. CONTROL DE TECLADO
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && piezaX > 0) {
        piezaX--; // Mover izquierda
    }
    if (event.key === 'ArrowRight' && piezaX < COLUMNAS - pieza.length) {
        piezaX++; // Mover derecha
    }
    if (event.key === 'ArrowUp') {
        rotarPieza(); // Rotar
    }
    dibujar(); // Volver a pintar tras el movimiento
});

// 6. GRAVEDAD AUTOMÁTICA (Bajar la pieza cada segundo)
setInterval(() => {
    // Nota: En un juego real aquí comprobarías colisiones antes de bajar
    if (piezaY < FILAS - 2) { 
        piezaY++;
    } else {
        // Si llega al suelo, de momento la reseteamos arriba para el ejemplo
        piezaY = 0;
        piezaX = 3;
    }
    dibujar();
}, 1000);

// Arrancar el juego dibujando por primera vez
dibujar();