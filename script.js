const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const message = document.getElementById('message');
const zone = document.getElementById('movementZone');

let dodgeCount = 0;
let currentScale = 1;

const phrases = [
  '¿Segura que quieres intentar decir que no? 🥺',
  'Piénsalo otra vez 😭',
  'Creo que el botón correcto es Sí ❤️',
  'No seas así conmigo 😢',
  'Mira lo bonito que quedó esto 💕',
  '¿Y si mejor eliges Sí? 🌹',
  'Prometo hacerte muy feliz ✨',
  'Ese botón no funciona muy bien 🤭',
  'Vamos, dale una oportunidad ❤️',
  '¿Por qué intentas presionar No? 😭',
  'Mi corazón está observando 👀',
  'Creo que te equivocaste de botón 😅',
  'El Sí se ve mucho más bonito 💖',
  '¿Estás completamente segura? 🥹',
  'No me rompas el corazón 💔',
  '¿Y si hacemos que sea un Sí? 🌷',
  'Ese No parece estar huyendo 😆',
  'Cada vez estás más cerca del Sí 💕',
  'No creo que quieras decir No realmente 🤔',
  'Intentarlo otra vez también cuenta ❤️',
  'Mi voto es por el Sí 🙋',
  'El universo quiere que presiones Sí ✨',
  'La respuesta correcta está resaltada 😌',
  'Te prometo muchos momentos bonitos 🌸',
  'No seas tímida 😳',
  'Ese No tiene miedo 😅',
  '¿Lo intentamos con Sí? ❤️',
  'El botón No está cooperando poco 🤭',
  'Creo que alguien está evitando una respuesta 😆',
  'Ya casi te convenzo 💘',
  'No te rindas... bueno sí, ríndete y presiona Sí 😌',
  'Ese botón sigue escapando 😂',
  '¿Ves? Ni él quiere ser presionado 🤣',
  'El Sí te está esperando ❤️',
  'Tú y yo sabemos cuál es la respuesta 🌹',
  'Cada intento hace crecer el amor 💕',
  '¿Seguimos jugando o presionas Sí? 😏',
  'Yo confío en tu elección ❤️',
  'Ya me estoy emocionando 🥹',
  'El No está cansado de correr 🏃'
];

let lastPhrase = '';

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomPhrase() {
  let phrase;

  do {
    phrase =
      phrases[
        Math.floor(
          Math.random() * phrases.length
        )
      ];
  } while (
    phrase === lastPhrase &&
    phrases.length > 1
  );

  lastPhrase = phrase;

  return phrase;
}

function placeButtons() {
  const zoneRect = zone.getBoundingClientRect();

  const yesWidth = yesBtn.offsetWidth;
  const yesHeight = yesBtn.offsetHeight;

  const noWidth = noBtn.offsetWidth;
  const noHeight = noBtn.offsetHeight;

  yesBtn.style.left =
    `${zoneRect.width * 0.25 - yesWidth / 2}px`;

  yesBtn.style.top =
    `${zoneRect.height / 2 - yesHeight / 2}px`;

  noBtn.style.left =
    `${zoneRect.width * 0.75 - noWidth / 2}px`;

  noBtn.style.top =
    `${zoneRect.height / 2 - noHeight / 2}px`;
}

function moveNoButton() {
  const zoneRect = zone.getBoundingClientRect();

  const noWidth = noBtn.offsetWidth;
  const noHeight = noBtn.offsetHeight;

  const yesRect = yesBtn.getBoundingClientRect();

  const margin = 10;

  let x;
  let y;
  let attempts = 0;

  do {
    x = random(
      margin,
      zoneRect.width - noWidth - margin
    );

    y = random(
      margin,
      zoneRect.height - noHeight - margin
    );

    attempts++;
  } while (
    attempts < 100 &&
    Math.hypot(
      x - (yesRect.left - zoneRect.left),
      y - (yesRect.top - zoneRect.top)
    ) < 140
  );

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  dodgeCount++;

  currentScale = Math.min(
    2.5,
    1 + dodgeCount * 0.05
  );

  yesBtn.style.transform =
    `scale(${currentScale})`;

  message.textContent =
    getRandomPhrase();
}

yesBtn.addEventListener('click', () => {
  noBtn.style.opacity = '0';
  noBtn.style.pointerEvents = 'none';
  noBtn.style.transform = 'scale(0)';

  const zoneRect =
    zone.getBoundingClientRect();

  const yesWidth =
    yesBtn.offsetWidth;

  const yesHeight =
    yesBtn.offsetHeight;

  yesBtn.style.transition =
    'all 0.8s ease';

  yesBtn.style.left =
    `${zoneRect.width / 2 - yesWidth / 2}px`;

  yesBtn.style.top =
    `${zoneRect.height / 2 - yesHeight / 2}px`;

  yesBtn.style.transform =
    'scale(2)';

  yesBtn.textContent =
    '❤️ Te Amo ❤️';

  message.textContent =
    'Sabía que dirías que sí. Este es el inicio de algo muy bonito ✨💕';
});

noBtn.addEventListener(
  'pointerenter',
  moveNoButton
);

noBtn.addEventListener(
  'pointerdown',
  moveNoButton
);

window.addEventListener(
  'resize',
  placeButtons
);

window.addEventListener(
  'load',
  placeButtons
);