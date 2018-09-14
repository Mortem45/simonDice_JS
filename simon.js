const levels = 15;
let keys = generateKeys(levels);

function getElementByKeyCode(keyCode) {
  return document.querySelector(`[data-key="${keyCode}"]`);
}

// agrega las clases css para el color y la animacion
function active(keyCode, opts = {}) {
  const el = getElementByKeyCode(keyCode);
  el.classList.add('active');
  if (opts.success) {
    el.classList.add('success');
  } else if (opts.fail) {
    el.classList.add('fail');
  }
  setTimeout(() => deactivate(el), 500);
}

// quita las clases de color y animacion 
function deactivate(el) {
  el.className = 'key';
}

// genera el listado de teclas que se usaran para el juego
// y se agregan en un array
function generateKeys(levels) {
  return new Array(levels).fill(0).map(generateRandomKeys);
}

// genera una tecla aleatoria por su keyCode
function generateRandomKeys() {
  const MIN = 65;
  const MAX = 90;
  return Math.round(Math.random() * (MAX - MIN) + MIN);
}

// indica cuando el juego acaba y genera la llamada a las funciones
// para la animacion

function nextLevel(level) {
  if (level == levels) {
    return alert('Ganaste');
  }


  for (let i = 0; i <= level; i++) {
    setTimeout(() => active(keys[i]), 1000 * (i + 1));
  }

  let i = 0;
  let teclaActual = keys[i];
  window.addEventListener('keydown', onKeyDown);

  function onKeyDown(ev) {
    if (ev.keyCode == teclaActual) {
      active(teclaActual, {
        success: true
      });
      i++;
      if (i > level) {
        window.removeEventListener('keydown', onKeyDown);
        setTimeout(() => nextLevel(i), 1500);
      }
      teclaActual = keys[i];
    } else {
      active(ev.keyCode, {
        fail: true
      });
      window.removeEventListener('keydown', onKeyDown);
      repetir()
    }
  }
}

let cont = document.getElementById('bot')
cont.addEventListener('click', comenzar)

function comenzar() {
  cont.classList.add('active');
  cont.classList.add('success');
  setTimeout(() => cont.classList.add('oculto') ,700);
  nextLevel(0);
  cont.innerHTML = "Comenzar"
}

function repetir() {
  cont.classList.remove('oculto')
  cont.classList.remove('success')
  cont.classList.remove('active')
  cont.innerHTML = "Repetir"
}