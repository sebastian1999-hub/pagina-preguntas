# Generador de Preguntas Numéricas

Una página web simple que genera preguntas numéricas aleatorias y permite revelar sus respuestas.

## Características

- 🎲 Botón para generar preguntas numéricas aleatorias
- 👁️ Botón para revelar la respuesta de la pregunta actual
- 📱 Diseño responsive que se adapta a diferentes dispositivos
- 🎨 Interfaz moderna con gradientes y animaciones

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)

## Estructura del Proyecto

```
pagina preguntas/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos y diseño
├── script.js           # Lógica de la aplicación
├── .github/
│   └── copilot-instructions.md
└── README.md           # Este archivo
```

## Cómo Usar

1. Abre el archivo `index.html` en tu navegador web
2. Haz clic en el botón "Generar Pregunta" para obtener una pregunta aleatoria
3. Haz clic en "Mostrar Respuesta" para ver la solución

También puedes hacer doble clic directamente en `index.html` desde el explorador de archivos.

## Preguntas Incluidas

La aplicación incluye 15 preguntas numéricas sobre diversos temas:
- Geografía (países, océanos, continentes)
- Ciencia (tabla periódica, astronomía)
- Anatomía humana (huesos, dientes, sangre)
- Datos curiosos (McDonald's, idiomas, población mundial)

## Personalización

Puedes agregar más preguntas editando el array `questions` en el archivo `script.js`:

```javascript
const questions = [
    {
        question: "Tu pregunta aquí",
        answer: "Tu respuesta aquí"
    },
    // Agrega más preguntas...
];
```

## Navegadores Compatibles

- Chrome/Edge (últimas versiones)
- Firefox (últimas versiones)
- Safari (últimas versiones)
- Opera (últimas versiones)

## Licencia

Este proyecto es de código abierto y está disponible para uso libre.
