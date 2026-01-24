const questions = [
  // FAUNA - Mamíferos
  {
    question: "¿Cuántos centímetros mide la lengua de una jirafa?",
    answer: "50 centímetros aproximadamente",
  },
  {
    question: "¿Cuántos latidos por minuto tiene el corazón de un colibrí?",
    answer: "Más de 1,200 latidos por minuto",
  },
  {
    question: "¿Cuántos años puede vivir una ballena azul?",
    answer: "95 años",
  },
  {
    question: "¿Cuántos kilos de bambú come un panda gigante al día?",
    answer: "25 kilos",
  },
  {
    question: "¿Cuántas horas al día duerme un koala?",
    answer: "20 horas",
  },
  {
    question: "¿Cuántos kilómetros puede caminar un elefante africano en un día?",
    answer: "Hasta 80 kilómetros",
  },
  {
    question: "¿Cuántos litros de agua puede beber un camello de una vez?",
    answer: "Hasta 200 litros",
  },
  {
    question: "¿Cuántos dientes tiene un cocodrilo durante su vida?",
    answer: "Hasta 3,000 dientes",
  },
  {
    question: "¿Cuántos kilómetros puede saltar un canguro en una hora?",
    answer: "Hasta 60 kilómetros",
  },
  {
    question: "¿Cuántos segundos puede contener la respiración una ballena?",
    answer: "Hasta 90 minutos (5,400 segundos)",
  },

  // FAUNA - Aves
  {
    question: "¿Cuántos kilómetros recorre el charrán ártico en su migración anual?",
    answer: "Más de 70,000 kilómetros",
  },
  {
    question: "¿Cuántas plumas tiene un cisne adulto aproximadamente?",
    answer: "Más de 25,000 plumas",
  },
  {
    question: "¿Cuántos huevos puede poner una gallina al año?",
    answer: "275 huevos",
  },
  {
    question: "¿Cuántos metros puede ver un águila desde el aire?",
    answer: "Hasta 3,000 metros de distancia",
  },
  {
    question: "¿Cuántas veces por segundo bate las alas un colibrí?",
    answer: "65 veces por segundo",
  },
  {
    question: "¿Cuántos kilómetros por hora alcanza un halcón peregrino en picada?",
    answer: "Más de 390 km/h",
  },
  {
    question: "¿Cuántos años puede vivir un loro africano gris?",
    answer: "Hasta 60 años",
  },
  {
    question: "¿Cuántos kilos puede cargar un avestruz?",
    answer: "Hasta 150 kilos",
  },
  {
    question: "¿Cuántas especies de pingüinos existen en el mundo?",
    answer: "18 especies",
  },
  {
    question: "¿Cuántos días puede volar un albatros sin tocar tierra?",
    answer: "Hasta 3 años sin tocar tierra",
  },

  // FAUNA - Insectos y Arácnidos
  {
    question: "¿Cuántos ojos tiene una araña típica?",
    answer: "8 ojos",
  },
  {
    question: "¿Cuántas veces su peso puede cargar una hormiga?",
    answer: "30 veces su peso",
  },
  {
    question: "¿Cuántos días vive una abeja obrera en verano?",
    answer: "26.5 días",
  },
  {
    question: "¿Cuántos kilos de miel produce una colmena al año?",
    answer: "45 kilos",
  },
  {
    question: "¿Cuántas especies de mariposas existen en el mundo?",
    answer: "Más de 20,000 especies",
  },
  {
    question: "¿Cuántos kilómetros puede recorrer una mariposa monarca en su migración?",
    answer: "Hasta 4,000 kilómetros",
  },
  {
    question: "¿Cuántos años puede vivir una hormiga reina?",
    answer: "Hasta 30 años",
  },
  {
    question: "¿Cuántos pares de alas tiene una libélula?",
    answer: "2 pares (4 alas)",
  },
  {
    question: "¿Cuántas veces su longitud puede saltar una pulga?",
    answer: "Hasta 200 veces su longitud",
  },
  {
    question: "¿Cuántos segmentos tiene el cuerpo de un ciempiés?",
    answer: "96 segmentos",
  },

  // FAUNA - Animales Marinos
  {
    question: "¿Cuántos brazos tiene una estrella de mar común?",
    answer: "5 brazos",
  },
  {
    question: "¿Cuántos tentáculos tiene un pulpo?",
    answer: "8 tentáculos",
  },
  {
    question: "¿Cuántos dientes tiene un tiburón blanco?",
    answer: "Hasta 300 dientes",
  },
  {
    question: "¿Cuántos años puede vivir una tortuga marina?",
    answer: "Hasta 100 años",
  },
  {
    question: "¿Cuántos litros de agua filtra una ballena azul al alimentarse?",
    answer: "Hasta 90,000 litros por bocado",
  },
  {
    question: "¿Cuántos colores puede cambiar un pulpo en un segundo?",
    answer: "Múltiples colores en menos de 1 segundo",
  },
  {
    question: "¿Cuántos kilos puede pesar un calamar gigante?",
    answer: "Hasta 275 kilos",
  },
  {
    question: "¿Cuántos años puede vivir una almeja islandesa?",
    answer: "Más de 500 años",
  },
  {
    question: "¿Cuántos metros puede medir una medusa melena de león?",
    answer: "Hasta 37 metros de longitud",
  },
  {
    question: "¿Cuántas ventosas tiene un tentáculo de calamar gigante?",
    answer: "Más de 300 ventosas",
  },

  // FLORA - Árboles
  {
    question: "¿Cuántos años puede vivir un árbol de secuoya gigante?",
    answer: "Más de 3,000 años",
  },
  {
    question: "¿Cuántos metros puede crecer un bambú en un día?",
    answer: "Hasta 91 centímetros (0.91 metros)",
  },
  {
    question: "¿Cuántos litros de agua puede absorber un árbol adulto al día?",
    answer: "600 litros",
  },
  {
    question: "¿Cuántos metros mide el árbol más alto del mundo (Hyperion)?",
    answer: "115.7 metros",
  },
  {
    question: "¿Cuántos años tiene el árbol más antiguo del mundo?",
    answer: "Más de 5,000 años",
  },
  {
    question: "¿Cuántas especies de árboles existen en el Amazonas?",
    answer: "Más de 16,000 especies",
  },
  {
    question: "¿Cuántos kilos de oxígeno produce un árbol maduro al año?",
    answer: "110 kilos",
  },
  {
    question: "¿Cuántos metros pueden crecer las raíces de un árbol?",
    answer: "Hasta 60 metros de profundidad",
  },
  {
    question: "¿Cuántas hojas puede tener un roble adulto?",
    answer: "Más de 200,000 hojas",
  },
  {
    question: "¿Cuántos anillos de crecimiento tiene un árbol centenario?",
    answer: "Uno por cada año de vida",
  },

  // FLORA - Plantas y Flores
  {
    question: "¿Cuántos días puede sobrevivir una rosa del desierto sin agua?",
    answer: "Hasta 5 años en sequía",
  },
  {
    question: "¿Cuántos pétalos tiene un girasol gigante?",
    answer: "1,500 flores diminutas",
  },
  {
    question: "¿Cuántos litros de néctar necesita una abeja para hacer un kilo de miel?",
    answer: "Necesita visitar 4 millones de flores",
  },
  {
    question: "¿Cuántos metros puede medir la flor cadáver (Amorphophallus)?",
    answer: "Hasta 3 metros de altura",
  },
  {
    question: "¿Cuántas especies de orquídeas existen en el mundo?",
    answer: "Más de 25,000 especies",
  },
  {
    question: "¿Cuántos años puede vivir un cactus saguaro?",
    answer: "Hasta 200 años",
  },
  {
    question: "¿Cuántos litros de agua puede almacenar un cactus barril?",
    answer: "Hasta 200 litros",
  },
  {
    question: "¿Cuántos días tarda en florecer una flor de loto?",
    answer: "3.5 días",
  },
  {
    question: "¿Cuántas semillas puede tener una vaina de amapola?",
    answer: "Hasta 2,000 semillas",
  },
  {
    question: "¿Cuántos metros puede extenderse una planta de hiedra?",
    answer: "Hasta 30 metros",
  },

  // PLANETA - Océanos y Mares
  {
    question: "¿Cuántos metros de profundidad tiene la Fosa de las Marianas?",
    answer: "11,034 metros",
  },
  {
    question: "¿Cuántos litros de agua contienen los océanos del mundo?",
    answer: "Más de 1.3 mil millones de kilómetros cúbicos",
  },
  {
    question: "¿Cuántas especies marinas se estima que existen en los océanos?",
    answer: "Más de 2 millones de especies",
  },
  {
    question: "¿Cuántos kilómetros cuadrados cubre el Océano Pacífico?",
    answer: "Más de 165 millones de km²",
  },
  {
    question: "¿Cuántos arrecifes de coral existen en el mundo?",
    answer: "Más de 6,000 arrecifes",
  },
  {
    question: "¿Cuántos grados Celsius tiene el agua en las fumarolas oceánicas?",
    answer: "Hasta 400°C",
  },
  {
    question: "¿Cuántos kilómetros de longitud tiene la corriente del Golfo?",
    answer: "Más de 10,000 kilómetros",
  },
  {
    question: "¿Cuántos metros se ha elevado el nivel del mar en 100 años?",
    answer: "17.5 centímetros",
  },
  {
    question: "¿Cuántas toneladas de plástico hay en los océanos?",
    answer: "Más de 150 millones de toneladas",
  },
  {
    question: "¿Cuántos volcanes submarinos activos hay en el mundo?",
    answer: "Más de 1 millón de volcanes",
  },

  // PLANETA - Montañas y Volcanes
  {
    question: "¿Cuántos metros mide el volcán más alto del mundo (Ojos del Salado)?",
    answer: "6,893 metros",
  },
  {
    question: "¿Cuántos grados Celsius puede alcanzar la lava de un volcán?",
    answer: "950°C",
  },
  {
    question: "¿Cuántos kilómetros cuadrados cubrió la erupción del Krakatoa en 1883?",
    answer: "Más de 800,000 km² de cenizas",
  },
  {
    question: "¿Cuántos metros crece el Monte Everest cada año?",
    answer: "4 milímetros por año",
  },
  {
    question: "¿Cuántas cadenas montañosas importantes hay en el mundo?",
    answer: "Más de 50 cadenas principales",
  },
  {
    question: "¿Cuántos glaciares hay en el mundo?",
    answer: "Más de 200,000 glaciares",
  },
  {
    question: "¿Cuántos metros de hielo tiene el glaciar más grueso de la Antártida?",
    answer: "Hasta 4,776 metros",
  },
  {
    question: "¿Cuántos volcanes hay en el Anillo de Fuego del Pacífico?",
    answer: "Más de 450 volcanes",
  },
  {
    question: "¿Cuántos años tiene la cordillera del Himalaya?",
    answer: "Más de 50 millones de años",
  },
  {
    question: "¿Cuántos kilómetros de largo tiene la cordillera de los Andes?",
    answer: "7,000 kilómetros",
  },

  // PLANETA - Bosques y Selvas
  {
    question: "¿Cuántos kilómetros cuadrados ocupa la selva amazónica?",
    answer: "5.5 millones de km²",
  },
  {
    question: "¿Cuántas especies de plantas hay en la Amazonía?",
    answer: "Más de 80,000 especies",
  },
  {
    question: "¿Cuántos litros de agua recicla la selva amazónica al día?",
    answer: "20,000 millones de litros",
  },
  {
    question: "¿Cuántos árboles hay en el planeta Tierra?",
    answer: "Más de 3 billones de árboles",
  },
  {
    question: "¿Cuántos kilómetros cuadrados de bosque se pierden al año?",
    answer: "Más de 100,000 km² anuales",
  },
  {
    question: "¿Cuántos años tiene el bosque tropical más antiguo?",
    answer: "Más de 130 millones de años",
  },
  {
    question: "¿Cuántas especies animales viven en la selva amazónica?",
    answer: "Más de 2.5 millones de especies",
  },
  {
    question: "¿Cuántos metros de altura puede alcanzar el dosel de la selva tropical?",
    answer: "37.5 metros",
  },
  {
    question: "¿Cuántas toneladas de oxígeno produce el Amazonas al año?",
    answer: "Más de 6,000 millones de toneladas",
  },
  {
    question: "¿Cuántos ríos tributarios tiene el río Amazonas?",
    answer: "Más de 1,100 ríos tributarios",
  },

  // PLANETA - Desiertos
  {
    question: "¿Cuántos kilómetros cuadrados mide el desierto del Sahara?",
    answer: "9 millones de km²",
  },
  {
    question: "¿Cuántos grados Celsius puede alcanzar el desierto más caliente?",
    answer: "Hasta 56.7°C (Desierto de Lut)",
  },
  {
    question: "¿Cuántos milímetros de lluvia recibe el desierto de Atacama al año?",
    answer: "Menos de 1 milímetro",
  },
  {
    question: "¿Cuántos años puede tener una duna del Sahara?",
    answer: "Hasta 10,000 años",
  },
  {
    question: "¿Cuántos metros de altura puede alcanzar una duna de arena?",
    answer: "Hasta 250 metros",
  },
  {
    question: "¿Cuántos desiertos principales hay en el mundo?",
    answer: "23 desiertos principales",
  },
  {
    question: "¿Cuántos kilómetros puede viajar una tormenta de arena del Sahara?",
    answer: "Hasta 5,000 kilómetros",
  },
  {
    question: "¿Cuántos litros de agua necesita un ser humano en el desierto diariamente?",
    answer: "8.5 litros",
  },
  {
    question: "¿Cuántas especies de animales viven en el desierto del Sahara?",
    answer: "Más de 500 especies",
  },
  {
    question: "¿Cuántos grados bajo cero puede alcanzar el desierto de Gobi?",
    answer: "Hasta -40°C",
  },

  // PLANETA - Clima y Atmósfera
  {
    question: "¿Cuántos rayos caen en la Tierra por segundo?",
    answer: "Aproximadamente 100 rayos",
  },
  {
    question: "¿Cuántos kilómetros de grosor tiene la atmósfera terrestre?",
    answer: "Hasta 10,000 kilómetros",
  },
  {
    question: "¿Cuántos litros de agua caen en una tormenta tropical?",
    answer: "Hasta 50 millones de litros por kilómetro cuadrado",
  },
  {
    question: "¿Cuántos kilómetros por hora puede alcanzar un tornado F5?",
    answer: "Más de 480 km/h",
  },
  {
    question: "¿Cuántos días al año llueve en el lugar más lluvioso del mundo?",
    answer: "Más de 350 días (Mawsynram, India)",
  },
  {
    question: "¿Cuántos grados Celsius fue la temperatura más baja registrada en la Tierra?",
    answer: "-89.2°C en la Antártida",
  },
  {
    question: "¿Cuántas gotas de agua contiene una nube típica?",
    answer: "Más de 100 millones de gotas",
  },
  {
    question: "¿Cuántos kilómetros por hora puede soplar el viento en un huracán categoría 5?",
    answer: "Más de 252 km/h",
  },
  {
    question: "¿Cuántos metros de nieve caen en las zonas más nevadas del mundo al año?",
    answer: "Hasta 30 metros",
  },
  {
    question: "¿Cuántos millones de toneladas de agua hay en la atmósfera?",
    answer: "Más de 12,900 millones de toneladas",
  },
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
