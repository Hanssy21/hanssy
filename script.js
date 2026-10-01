// ======================================
// MURCIÉLAGO PIXEL ART
// ======================================

const bat = document.getElementById("bat");

const character = document.querySelector(".character");


// ======================================
// FRAMES DEL MURCIÉLAGO
// ======================================
//
// 16 x 16 píxeles
//
// 0 = transparente
// 1 = píxel
//
// ======================================

const frames = [

  // ====================================
  // FRAME 1
  // ALAS ARRIBA
  // ====================================

  [
    "0000000000000000",
    "0000001101100000",
    "0000011111110000",
    "0000111111111000",
    "0011111001111100",
    "0111110000011110",
    "1111100010001111",
    "1111000111100111",
    "1110001111110011",
    "1100011111111001",
    "1000111111111100",
    "0000111111111100",
    "0000011111111000",
    "0000011111111000",
    "0000001111110000",
    "0000000000000000"
  ],


  // ====================================
  // FRAME 2
  // ALAS MEDIO
  // ====================================

  [
    "0000000000000000",
    "0000000001100000",
    "0000011011110000",
    "0000111111111000",
    "0001111101111100",
    "0011111000111110",
    "0111110000011110",
    "1111100010001111",
    "1111000111100111",
    "1110001111110011",
    "1100011111111001",
    "1000111111111100",
    "0000111111111100",
    "0000011111111000",
    "0000011111111000",
    "0000000000000000"
  ],


  // ====================================
  // FRAME 3
  // ALAS ABAJO
  // ====================================

  [
    "0000000000000000",
    "0000000000000000",
    "0000000111100000",
    "0000011111110000",
    "0000111111111000",
    "0001111111111100",
    "0011111001111110",
    "0111110000011110",
    "1111100010001111",
    "1111000111100111",
    "1110001111110011",
    "1100011111111001",
    "1000111111111100",
    "0000111111111100",
    "0000011111111000",
    "0000001111110000"
  ],


  // ====================================
  // FRAME 4
  // ALAS MEDIO
  // ====================================

  [
    "0000000000000000",
    "0000000011000000",
    "0000001111110000",
    "0000011111111000",
    "0000111111111100",
    "0001111101111110",
    "0011111000111110",
    "0111110000011111",
    "1111100010001111",
    "1111000111100111",
    "1110001111110011",
    "1100011111111001",
    "1000111111111100",
    "0000111111111100",
    "0000011111111000",
    "0000000000000000"
  ]

];


// ======================================
// POSICIÓN DEL PERSONAJE
// ======================================

let x = window.innerWidth / 2;

let y = window.innerHeight / 2;


// ======================================
// VELOCIDAD
// ======================================

let speed = 3;


// ======================================
// TECLAS PRESIONADAS
// ======================================

const keys = {};


// ======================================
// TECLADO - PRESIONAR
// ======================================

window.addEventListener("keydown", (event) => {

  const allowedKeys = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight"
  ];


  if (allowedKeys.includes(event.key)) {

    event.preventDefault();

    keys[event.key] = true;

  }

});


// ======================================
// TECLADO - SOLTAR
// ======================================

window.addEventListener("keyup", (event) => {

  keys[event.key] = false;

});


// ======================================
// DIBUJAR FRAME
// ======================================

function drawFrame() {

  // Limpiar el murciélago

  bat.innerHTML = "";


  // Frame actual

  const currentFrame = frames[frame];


  // Recorrer filas

  for (let row = 0; row < 16; row++) {


    // Recorrer columnas

    for (let column = 0; column < 16; column++) {


      // Comprobar si existe píxel

      if (currentFrame[row][column] === "1") {

        const pixel = document.createElement("div");

        pixel.className = "pixel";


        // Posición del píxel

        pixel.style.gridColumn = column + 1;

        pixel.style.gridRow = row + 1;


        // Agregar píxel

        bat.appendChild(pixel);

      }

    }

  }

}


// ======================================
// ANIMACIÓN
// ======================================

let frame = 0;


setInterval(() => {

  frame++;


  if (frame >= frames.length) {

    frame = 0;

  }


  drawFrame();

}, 100);


// ======================================
// MOVIMIENTO
// ======================================

function update() {


  // ====================================
  // IZQUIERDA
  // ====================================

  if (keys["ArrowLeft"]) {

    x -= speed;

  }


  // ====================================
  // DERECHA
  // ====================================

  if (keys["ArrowRight"]) {

    x += speed;

  }


  // ====================================
  // ARRIBA
  // ====================================

  if (keys["ArrowUp"]) {

    y -= speed;

  }


  // ====================================
  // ABAJO
  // ====================================

  if (keys["ArrowDown"]) {

    y += speed;

  }


  // ====================================
  // LÍMITES
  // ====================================

  const margin = 70;


  x = Math.max(
    margin,
    Math.min(
      window.innerWidth - margin,
      x
    )
  );


  y = Math.max(
    margin,
    Math.min(
      window.innerHeight - margin,
      y
    )
  );


  // ====================================
  // MOVER PERSONAJE COMPLETO
  // ====================================
  //
  // Movemos .character, no .bat.
  // Por eso HANSSY ROY acompaña
  // al murciélago.
  //

  character.style.left = `${x}px`;

  character.style.top = `${y}px`;


  // ====================================
  // SIGUIENTE FRAME
  // ====================================

  requestAnimationFrame(update);

}


// ======================================
// CONTROLES TÁCTILES
// ======================================

const buttons = document.querySelectorAll(".arrow");


buttons.forEach((button) => {

  const key = button.dataset.key;


  // ====================================
  // PRESIONAR BOTÓN
  // ====================================

  button.addEventListener(
    "pointerdown",
    (event) => {

      event.preventDefault();


      keys[key] = true;


      // Capturar el dedo/puntero

      if (button.setPointerCapture) {

        button.setPointerCapture(
          event.pointerId
        );

      }

    }
  );


  // ====================================
  // SOLTAR BOTÓN
  // ====================================

  button.addEventListener(
    "pointerup",
    (event) => {

      event.preventDefault();


      keys[key] = false;

    }
  );


  // ====================================
  // CANCELAR
  // ====================================

  button.addEventListener(
    "pointercancel",
    (event) => {

      event.preventDefault();


      keys[key] = false;

    }
  );


  // ====================================
  // SALIR
  // ====================================

  button.addEventListener(
    "pointerleave",
    (event) => {


      if (
        !button.hasPointerCapture ||
        !button.hasPointerCapture(
          event.pointerId
        )
      ) {

        keys[key] = false;

      }

    }
  );

});


// ======================================
// SI SE PIERDE EL FOCO
// ======================================

window.addEventListener("blur", () => {

  keys["ArrowUp"] = false;

  keys["ArrowDown"] = false;

  keys["ArrowLeft"] = false;

  keys["ArrowRight"] = false;

});


// ======================================
// CAMBIO DE TAMAÑO
// ======================================

window.addEventListener("resize", () => {

  const margin = 70;


  x = Math.max(
    margin,
    Math.min(
      window.innerWidth - margin,
      x
    )
  );


  y = Math.max(
    margin,
    Math.min(
      window.innerHeight - margin,
      y
    )
  );

});


// ======================================
// INICIAR
// ======================================

drawFrame();

update();

