const questions = [
  {
    question:
      "¿Cuántos restaurantes McDonald's hay aproximadamente en el mundo?",
    answer: "Más de 40,000 restaurantes",
  },
  {
    question: "¿Cuántos huesos tiene el cuerpo humano adulto?",
    answer: "206 huesos",
  },
  {
    question: "¿Cuántos países hay en el mundo actualmente?",
    answer: "195 países",
  },
  {
    question: "¿Cuántos kilómetros mide la Gran Muralla China aproximadamente?",
    answer: "21,196 kilómetros",
  },
  {
    question: "¿Cuántos litros de sangre tiene el cuerpo humano promedio?",
    answer: "Entre 4.5 y 5.5 litros",
  },
  {
    question: "¿Cuántos continentes hay en la Tierra?",
    answer: "7 continentes",
  },
  {
    question: "¿Cuántas estrellas tiene aproximadamente la Vía Láctea?",
    answer: "Entre 100,000 y 400,000 millones de estrellas",
  },
  {
    question: "¿Cuántos idiomas se hablan en el mundo aproximadamente?",
    answer: "Más de 7,000 idiomas",
  },
  {
    question: "¿Cuántos metros mide el Monte Everest?",
    answer: "8,849 metros",
  },
  {
    question: "¿Cuántos océanos hay en el planeta?",
    answer: "5 océanos",
  },
  {
    question: "¿Cuántos dientes tiene un adulto humano?",
    answer: "32 dientes",
  },
  {
    question: "¿Cuántos segundos hay en un día?",
    answer: "86,400 segundos",
  },
  {
    question: "¿Cuántos habitantes tiene aproximadamente la Tierra?",
    answer: "Más de 8,000 millones de personas",
  },
  {
    question: "¿Cuántos elementos hay en la tabla periódica?",
    answer: "118 elementos",
  },
  {
    question:
      "¿Cuántos años luz de diámetro tiene aproximadamente la Vía Láctea?",
    answer: "Entre 100,000 y 200,000 años luz",
  },

  {
    question: "¿Cuántos días tiene un año común?",
    answer: "365 días",
  },
  { question: "¿Cuántos días tiene un año bisiesto?", answer: "366 días" },
  {
    question: "¿Cuántos continentes hay en el mundo?",
    answer: "7 continentes",
  },
  { question: "¿Cuántos océanos existen en la Tierra?", answer: "5 océanos" },
  {
    question: "¿Cuántos huesos tiene el cuerpo humano adulto?",
    answer: "206 huesos",
  },
  {
    question: "¿Cuántos músculos aproximadamente tiene el cuerpo humano?",
    answer: "Más de 600 músculos",
  },
  {
    question: "¿Cuántos países reconocidos existen en el mundo?",
    answer: "195 países",
  },
  { question: "¿Cuántas teclas tiene un piano estándar?", answer: "88 teclas" },
  { question: "¿Cuántos minutos tiene una hora?", answer: "60 minutos" },
  { question: "¿Cuántos segundos tiene un minuto?", answer: "60 segundos" },

  {
    question: "¿Cuántos satélites naturales tiene la Tierra?",
    answer: "1 satélite natural",
  },
  {
    question:
      "¿Cuántos kilómetros mide la circunferencia de la Tierra aproximadamente?",
    answer: "40,075 kilómetros",
  },
  {
    question: "¿Cuántos planetas hay en el Sistema Solar?",
    answer: "8 planetas",
  },
  { question: "¿Cuántas lunas tiene Marte?", answer: "2 lunas" },
  {
    question:
      "¿Cuántos años tarda la Tierra en completar una órbita alrededor del Sol?",
    answer: "1 año",
  },
  {
    question: "¿Cuántas estrellas hay en la Vía Láctea aproximadamente?",
    answer: "Entre 100,000 y 400,000 millones",
  },
  { question: "¿Cuántos metros mide un kilómetro?", answer: "1,000 metros" },
  {
    question: "¿Cuántos miligramos tiene un gramo?",
    answer: "1,000 miligramos",
  },
  {
    question: "¿Cuántos centímetros hay en un metro?",
    answer: "100 centímetros",
  },
  { question: "¿Cuántos lados tiene un hexágono?", answer: "6 lados" },

  { question: "¿Cuántas provincias tiene España?", answer: "50 provincias" },
  { question: "¿Cuántos estados tiene Estados Unidos?", answer: "50 estados" },
  {
    question: "¿Cuántos habitantes tiene aproximadamente China?",
    answer: "Más de 1,400 millones de personas",
  },
  {
    question: "¿Cuántos habitantes tiene aproximadamente India?",
    answer: "Más de 1,400 millones de personas",
  },
  {
    question: "¿Cuántos países conforman la Unión Europea?",
    answer: "27 países",
  },
  {
    question: "¿Cuántos idiomas oficiales reconoce la ONU?",
    answer: "6 idiomas oficiales",
  },
  {
    question: "¿Cuántos metros mide el Monte Everest?",
    answer: "8,848 metros",
  },
  {
    question: "¿Cuántas veces gira la Tierra sobre su eje en un día?",
    answer: "1 vez",
  },
  {
    question: "¿Cuántos kilómetros por segundo viaja la luz?",
    answer: "300,000 km/s aproximadamente",
  },
  {
    question: "¿Cuántos dientes permanentes tiene un adulto?",
    answer: "32 dientes",
  },

  {
    question: "¿Cuántos jugadores por equipo hay en un partido de fútbol?",
    answer: "11 jugadores",
  },
  { question: "¿Cuántos anillos tiene el logo olímpico?", answer: "5 anillos" },
  {
    question: "¿Cuántos segundos dura un asalto de boxeo profesional?",
    answer: "180 segundos",
  },
  {
    question: "¿Cuántos minutos dura un partido de baloncesto en la NBA?",
    answer: "48 minutos",
  },
  {
    question: "¿Cuántos metros mide una piscina olímpica?",
    answer: "50 metros",
  },
  {
    question: "¿Cuántos hoyos tiene un campo de golf estándar?",
    answer: "18 hoyos",
  },
  {
    question: "¿Cuántos puntos vale un triple en baloncesto?",
    answer: "3 puntos",
  },
  { question: "¿Cuántas piezas tiene un ajedrez?", answer: "32 piezas" },
  {
    question: "¿Cuántos jugadores hay en un equipo de voleibol?",
    answer: "6 jugadores",
  },
  {
    question: "¿Cuántos kilómetros tiene una maratón?",
    answer: "42.195 kilómetros",
  },

  { question: "¿Cuántos bits tiene un byte?", answer: "8 bits" },
  {
    question: "¿Cuántos gigabytes tiene un terabyte?",
    answer: "1,024 gigabytes",
  },
  {
    question: "¿Cuántos colores tiene el cubo de Rubik estándar?",
    answer: "6 colores",
  },
  {
    question: "¿Cuántos caracteres tiene el alfabeto español?",
    answer: "27 letras",
  },
  {
    question: "¿Cuántos elementos químicos existen actualmente?",
    answer: "118 elementos",
  },
  {
    question: "¿Cuántos metros cuadrados tiene un hectárea?",
    answer: "10,000 metros cuadrados",
  },
  {
    question: "¿Cuántas notas musicales hay en la escala occidental?",
    answer: "7 notas",
  },
  { question: "¿Cuántos colores tiene el arcoíris?", answer: "7 colores" },
  { question: "¿Cuántos años dura un siglo?", answer: "100 años" },
  { question: "¿Cuántos años dura un milenio?", answer: "1,000 años" },

  { question: "¿Cuántas semanas tiene un año?", answer: "52 semanas" },
  {
    question: "¿Cuántas horas de diferencia hay entre GMT y UTC?",
    answer: "0 horas",
  },
  { question: "¿Cuántos signos tiene el zodiaco?", answer: "12 signos" },
  {
    question: "¿Cuántas cartas tiene una baraja española?",
    answer: "40 cartas",
  },
  {
    question: "¿Cuántas cartas tiene una baraja francesa?",
    answer: "52 cartas",
  },
  {
    question: "¿Cuántos grados se requieren para un ángulo recto?",
    answer: "90 grados",
  },
  { question: "¿Cuántos lados tiene un octágono?", answer: "8 lados" },
  {
    question:
      "¿Cuántos planetas enanos reconoce la Unión Astronómica Internacional?",
    answer: "5 planetas enanos",
  },
  { question: "¿Cuántos corazones tiene un pulpo?", answer: "3 corazones" },
  {
    question: "¿Cuántos litros de sangre tiene un adulto promedio?",
    answer: "Entre 4.5 y 6 litros",
  },

  {
    question: "¿Cuántos pies hay en un metro?",
    answer: "3.28 pies aproximadamente",
  },
  { question: "¿Cuántos años tenía Mozart cuando murió?", answer: "35 años" },
  { question: "¿Cuántas islas componen Japón?", answer: "Más de 6,800 islas" },
  {
    question: "¿Cuántos kilómetros tiene el río Amazonas aproximadamente?",
    answer: "6,400 kilómetros",
  },
  {
    question: "¿Cuántas lunas tiene Júpiter aproximadamente?",
    answer: "79 lunas",
  },
  {
    question: "¿Cuántas veces más grande es el Sol que la Tierra?",
    answer: "Más de 1 millón de veces en volumen",
  },
  {
    question: "¿Cuántos días tarda la Luna en orbitar la Tierra?",
    answer: "27.3 días",
  },
  {
    question: "¿Cuántos huesos tiene un bebé al nacer?",
    answer: "Alrededor de 270 huesos",
  },
  { question: "¿Cuántos países tiene América?", answer: "35 países" },
  {
    question: "¿Cuántos puntos tiene un dado estándar?",
    answer: "21 puntos en total",
  },

  {
    question: "¿Cuántos años tardó en construirse la Gran Muralla China?",
    answer: "Más de 2,000 años",
  },
  {
    question: "¿Cuántos litros tiene un metro cúbico?",
    answer: "1,000 litros",
  },
  {
    question: "¿Cuántos habitantes tiene aproximadamente México?",
    answer: "Más de 126 millones de personas",
  },
  {
    question:
      "¿Cuántos lenguajes de programación se usan ampliamente hoy en día?",
    answer: "Más de 700 lenguajes",
  },
  {
    question: "¿Cuántos cromosomas tiene el ser humano?",
    answer: "46 cromosomas",
  },
  { question: "¿Cuántas provincias tiene Argentina?", answer: "23 provincias" },
  {
    question: "¿Cuántos kilómetros cuadrados tiene África?",
    answer: "30 millones de km² aproximadamente",
  },
  { question: "¿Cuántos vértices tiene un cubo?", answer: "8 vértices" },
  { question: "¿Cuántos países forman Oceanía?", answer: "14 países" },
  { question: "¿Cuántos años gobernó la reina Isabel II?", answer: "70 años" },

  { question: "¿Cuántos días dura un ciclo lunar?", answer: "29.5 días" },
  {
    question: "¿Cuántos colores tiene la bandera de Francia?",
    answer: "3 colores",
  },
  {
    question: "¿Cuántos años duró la Primera Guerra Mundial?",
    answer: "4 años",
  },
  {
    question: "¿Cuántos años duró la Segunda Guerra Mundial?",
    answer: "6 años",
  },
  {
    question: "¿Cuántas teclas tiene un teclado de computadora estándar?",
    answer: "104 teclas",
  },
  {
    question: "¿Cuántos mandamientos hay en la tradición judeocristiana?",
    answer: "10 mandamientos",
  },
  { question: "¿Cuántos lados tiene un dodecaedro?", answer: "12 caras" },
  {
    question: "¿Cuántos satélites tiene Saturno aproximadamente?",
    answer: "83 satélites",
  },
  {
    question: "¿Cuántos habitantes tiene aproximadamente Brasil?",
    answer: "Más de 215 millones de personas",
  },
  {
    question: "¿Cuántos mililitros tiene un litro?",
    answer: "1,000 mililitros",
  },

  {
    question: "¿Cuántos kilómetros mide la Muralla China aproximadamente?",
    answer: "21,000 kilómetros",
  },
  {
    question: "¿Cuántos nervios craneales tiene el ser humano?",
    answer: "12 nervios craneales",
  },
  { question: "¿Cuántos huesos tiene la mano humana?", answer: "27 huesos" },
  {
    question: "¿Cuántos minutos dura una película promedio?",
    answer: "Entre 90 y 120 minutos",
  },
  {
    question: "¿Cuántos litros de agua se recomienda beber al día?",
    answer: "2 litros aproximadamente",
  },
  {
    question: "¿Cuántas especies de aves existen en el mundo?",
    answer: "Más de 10,000 especies",
  },
  {
    question: "¿Cuántas calorías tiene un kilogramo de grasa corporal?",
    answer: "7,700 calorías",
  },
  {
    question: "¿Cuántos glóbulos rojos hay en una gota de sangre?",
    answer: "Millones de glóbulos rojos",
  },
  {
    question: "¿Cuántas vértebras tiene la columna humana?",
    answer: "33 vértebras",
  },
  {
    question: "¿Cuántos litros de aire respira una persona al día?",
    answer: "Alrededor de 11,000 litros",
  },

  {
    question: "¿Cuántos planetas exteriores tiene el Sistema Solar?",
    answer: "4 planetas exteriores",
  },
  {
    question:
      "¿Cuántos bloques tiene la piedra lunar más grande traída a la Tierra?",
    answer: "11.7 kilogramos",
  },
  {
    question: "¿Cuántos años vive un roble promedio?",
    answer: "Entre 200 y 500 años",
  },
  {
    question: "¿Cuántas horas duerme un adulto promedio al día?",
    answer: "Entre 7 y 9 horas",
  },
  {
    question: "¿Cuántos kilómetros por hora puede correr un guepardo?",
    answer: "Hasta 120 km/h",
  },
  {
    question: "¿Cuántas personas caben en un avión comercial típico?",
    answer: "Entre 150 y 300 personas",
  },
  {
    question: "¿Cuántos días puede sobrevivir una persona sin agua?",
    answer: "Entre 3 y 5 días",
  },
  {
    question: "¿Cuántos idiomas se hablan en la India?",
    answer: "Más de 400 idiomas",
  },
  {
    question: "¿Cuántos metros de altura tiene la Torre Eiffel?",
    answer: "324 metros",
  },
  { question: "¿Cuántos años tiene un lustro?", answer: "5 años" },

  {
    question: "¿Cuántos libros conforman la Biblia cristiana?",
    answer: "66 libros",
  },
  {
    question: "¿Cuántos gramos pesa un litro de agua?",
    answer: "1,000 gramos",
  },
  {
    question: "¿Cuántos corazones tiene una lombriz de tierra?",
    answer: "5 corazones",
  },
  {
    question: "¿Cuántos millones de km² tiene la Antártida?",
    answer: "14 millones de km²",
  },
  {
    question: "¿Cuántos años se estima que tiene el universo?",
    answer: "13.8 mil millones de años",
  },
  { question: "¿Cuántas notas tiene un piano cromático?", answer: "88 notas" },
  { question: "¿Cuántas lunas tiene Neptuno?", answer: "14 lunas" },
  {
    question: "¿Cuántos premios Óscar se entregan por ceremonia?",
    answer: "24 categorías",
  },
  {
    question: "¿Cuántos habitantes tiene aproximadamente Nigeria?",
    answer: "Más de 220 millones de personas",
  },
  { question: "¿Cuántas patas tiene un insecto?", answer: "6 patas" },

  {
    question: "¿Cuántas costillas tiene el cuerpo humano?",
    answer: "24 costillas",
  },
  { question: "¿Cuántas hojas tiene un trébol común?", answer: "3 hojas" },
  {
    question: "¿Cuántos kilómetros cuadrados tiene Rusia?",
    answer: "17 millones de km²",
  },
  {
    question: "¿Cuántos días tiene febrero en un año común?",
    answer: "28 días",
  },
  {
    question: "¿Cuántos puntos tiene una estrella típica dibujada?",
    answer: "5 puntos",
  },
  {
    question: "¿Cuántos músculos se utilizan al sonreír?",
    answer: "17 músculos",
  },
  {
    question: "¿Cuántos músculos se utilizan al fruncir el ceño?",
    answer: "43 músculos",
  },
  { question: "¿Cuántos huesos forman el cráneo humano?", answer: "22 huesos" },
  {
    question: "¿Cuántos pares de cromosomas tiene un humano?",
    answer: "23 pares",
  },
  { question: "¿Cuántos metros mide el Big Ben?", answer: "96 metros" },

  {
    question: "¿Cuántos años vive una tortuga gigante?",
    answer: "Más de 100 años",
  },
  {
    question: "¿Cuántos días puede sobrevivir una persona sin comida?",
    answer: "Entre 30 y 40 días",
  },
  { question: "¿Cuántos dedos tiene un ser humano?", answer: "20 dedos" },
  {
    question: "¿Cuántos minutos se recomienda lavar los dientes?",
    answer: "2 minutos",
  },
  {
    question: "¿Cuántas neuronas tiene el cerebro humano?",
    answer: "86,000 millones aproximadamente",
  },
  { question: "¿Cuántos satélites tiene Urano?", answer: "27 satélites" },
  {
    question: "¿Cuántos kilómetros mide la Gran Barrera de Coral?",
    answer: "2,300 kilómetros",
  },
  {
    question: "¿Cuántos volcanes activos hay en el mundo?",
    answer: "Más de 1,500",
  },
  {
    question: "¿Cuántos glaciares existen en la Patagonia?",
    answer: "Más de 300 glaciares",
  },
  {
    question: "¿Cuántos elementos componen el ADN?",
    answer: "4 bases nitrogenadas",
  },

  {
    question: "¿Cuántos sentidos tiene el ser humano tradicionalmente?",
    answer: "5 sentidos",
  },
  {
    question: "¿Cuántas veces late el corazón por minuto en reposo?",
    answer: "60 a 100 veces",
  },
  {
    question: "¿Cuántos litros de gasolina caben en un coche promedio?",
    answer: "Entre 45 y 60 litros",
  },
  { question: "¿Cuántos kilómetros mide el Nilo?", answer: "6,650 kilómetros" },
  { question: "¿Cuántos elementos tiene una docena?", answer: "12 elementos" },
  {
    question: "¿Cuántos climas principales existen según Köppen?",
    answer: "5 grandes climas",
  },
  {
    question: "¿Cuántos órganos principales tiene el cuerpo humano?",
    answer: "Más de 70 órganos",
  },
  {
    question: "¿Cuántos satélites artificiales orbitan la Tierra?",
    answer: "Más de 7,000 satélites",
  },
  {
    question: "¿Cuántos kilos pesa un león adulto?",
    answer: "Entre 150 y 250 kg",
  },
  {
    question: "¿Cuántos años vive un perro en promedio?",
    answer: "Entre 10 y 13 años",
  },

  {
    question: "¿Cuántos aeropuertos internacionales hay en Estados Unidos?",
    answer: "Más de 100 aeropuertos",
  },
  { question: "¿Cuántas horas tiene un día en Marte?", answer: "24.6 horas" },
  {
    question: "¿Cuántos años tarda Saturno en orbitar el Sol?",
    answer: "29.4 años",
  },
  {
    question: "¿Cuántos kilómetros mide la costa de Chile?",
    answer: "6,400 kilómetros",
  },
  {
    question: "¿Cuántas especies de mamíferos existen?",
    answer: "Más de 6,000 especies",
  },
  {
    question: "¿Cuántos idiomas se hablan en el mundo?",
    answer: "Más de 7,000 idiomas",
  },
  {
    question: "¿Cuántos pasos debe caminar una persona al día?",
    answer: "10,000 pasos recomendados",
  },
  { question: "¿Cuánto mide la Estatua de la Libertad?", answer: "93 metros" },
  {
    question: "¿Cuántos grados Fahrenheit equivalen a 0 grados Celsius?",
    answer: "32 grados Fahrenheit",
  },
  { question: "¿Cuántos pulmones tiene el ser humano?", answer: "2 pulmones" },
];

let currentQuestion = null;

// Referencias a elementos del DOM
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const answerBox = document.getElementById("answerBox");
const generateBtn = document.getElementById("generateBtn");
const showAnswerBtn = document.getElementById("showAnswerBtn");

// Función para generar una pregunta aleatoria
function generateQuestion() {
  // Seleccionar una pregunta aleatoria
  const randomIndex = Math.floor(Math.random() * questions.length);
  currentQuestion = questions[randomIndex];

  // Mostrar la pregunta
  questionElement.textContent = currentQuestion.question;

  // Ocultar la respuesta anterior
  answerBox.classList.remove("show");
  answerElement.textContent = "";

  // Habilitar el botón de mostrar respuesta
  showAnswerBtn.disabled = false;
}

// Función para mostrar la respuesta
function showAnswer() {
  if (currentQuestion) {
    answerElement.textContent = `Respuesta: ${currentQuestion.answer}`;
    answerBox.classList.add("show");
  }
}

// Event listeners
generateBtn.addEventListener("click", generateQuestion);
showAnswerBtn.addEventListener("click", showAnswer);
