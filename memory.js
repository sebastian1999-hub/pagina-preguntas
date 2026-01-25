// Variables del juego
let gridSize = 5;
let numPlayers = 2;
let currentPlayer = 0;
let players = [];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let canFlip = true;

// Emojis para las cartas (suficientes iconos para cubrir cuadrícula 9x9)
const emojis = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
    '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔',
    '🐧', '🐦', '🐤', '🦆', '🦉', '🦇', '🐺', '🐗',
    '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐢',
    '🐙', '🦀', '🐡', '🐠', '🐟', '🦈', '🐳', '🐬',
    '🦎', '🐊', '🐅', '🐆', '🦓', '🦍', '🐘', '🐒',
    '🦏', '🦛'
];

// Elementos del DOM
const setupPanel = document.getElementById('setupPanel');
const gamePanel = document.getElementById('gamePanel');
const memoryGrid = document.getElementById('memoryGrid');
const playersScore = document.getElementById('playersScore');
const currentTurnText = document.getElementById('currentTurn');
const winModal = document.getElementById('winModal');
const winnerInfo = document.getElementById('winnerInfo');

// Botones de configuración
const sizeBtns = document.querySelectorAll('.size-btn');
const decreasePlayerBtn = document.getElementById('decreasePlayer');
const increasePlayerBtn = document.getElementById('increasePlayer');
const numPlayersInput = document.getElementById('numPlayers');
const startGameBtn = document.getElementById('startGameBtn');
const resetGameBtn = document.getElementById('resetGameBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

// Event Listeners - Configuración
sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        sizeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        gridSize = parseInt(btn.dataset.size);
    });
});

decreasePlayerBtn.addEventListener('click', () => {
    if (numPlayers > 1) {
        numPlayers--;
        numPlayersInput.value = numPlayers;
    }
});

increasePlayerBtn.addEventListener('click', () => {
    if (numPlayers < 6) {
        numPlayers++;
        numPlayersInput.value = numPlayers;
    }
});

startGameBtn.addEventListener('click', startGame);
resetGameBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', resetGame);

// Función para iniciar el juego
function startGame() {
    // Inicializar jugadores
    players = [];
    for (let i = 0; i < numPlayers; i++) {
        players.push({
            id: i,
            name: `Jugador ${i + 1}`,
            score: 0
        });
    }
    
    currentPlayer = 0;
    matchedPairs = 0;
    flippedCards = [];
    canFlip = true;
    
    // Ocultar panel de configuración y mostrar juego
    setupPanel.classList.add('hidden');
    gamePanel.classList.remove('hidden');
    
    // Crear tablero de puntuaciones
    createScoreBoard();
    
    // Crear las cartas
    createCards();
    
    // Actualizar turno
    updateTurn();
}

// Crear tablero de puntuaciones
function createScoreBoard() {
    playersScore.innerHTML = '';
    players.forEach((player, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.className = `player-score ${index === 0 ? 'active' : ''}`;
        playerDiv.id = `player-${index}`;
        playerDiv.innerHTML = `
            <h3>${player.name}</h3>
            <p class="score">0</p>
        `;
        playersScore.appendChild(playerDiv);
    });
}

// Crear las cartas del juego
function createCards() {
    memoryGrid.innerHTML = '';
    memoryGrid.className = `memory-grid size-${gridSize}`;
    
    const totalCards = gridSize * gridSize; // 9, 25, 49
    const numPairs = Math.floor(totalCards / 2); // 4, 12, 24
    
    // Seleccionar emojis aleatorios
    const shuffledEmojis = shuffleArray([...emojis]);
    const selectedEmojis = shuffledEmojis.slice(0, numPairs);
    
    // Crear pares de emojis
    let cardValues = [];
    selectedEmojis.forEach(emoji => {
        cardValues.push(emoji);
        cardValues.push(emoji);
    });
    
    // Agregar una carta sin pareja (emoji diferente)
    const lonelyEmoji = shuffledEmojis[numPairs];
    cardValues.push(lonelyEmoji);
    
    // Mezclar las cartas
    cardValues = shuffleArray(cardValues);
    
    // Crear elementos HTML de las cartas
    cards = [];
    cardValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.value = value;
        card.dataset.index = index;
        card.innerHTML = '?';
        
        card.addEventListener('click', () => flipCard(card, value, index));
        
        memoryGrid.appendChild(card);
        cards.push({
            element: card,
            value: value,
            index: index,
            matched: false
        });
    });
}

// Voltear una carta
function flipCard(cardElement, value, index) {
    if (!canFlip || cardElement.classList.contains('flipped') || 
        cardElement.classList.contains('matched')) {
        return;
    }
    
    // Voltear la carta
    cardElement.classList.add('flipped');
    cardElement.innerHTML = value;
    flippedCards.push({ element: cardElement, value: value, index: index });
    
    // Si hay dos cartas volteadas, verificar si coinciden
    if (flippedCards.length === 2) {
        canFlip = false;
        setTimeout(checkMatch, 1000);
    }
}

// Verificar si las cartas coinciden
function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.value === card2.value) {
        // ¡Coinciden!
        card1.element.classList.add('matched');
        card2.element.classList.add('matched');
        cards[card1.index].matched = true;
        cards[card2.index].matched = true;
        
        // Sumar punto al jugador actual
        players[currentPlayer].score++;
        updateScore();
        
        matchedPairs++;
        
        // Verificar si el juego terminó
        if (matchedPairs === Math.floor((gridSize * gridSize) / 2)) {
            setTimeout(endGame, 500);
        }
    } else {
        // No coinciden
        card1.element.classList.add('no-match');
        card2.element.classList.add('no-match');
        
        setTimeout(() => {
            card1.element.classList.remove('flipped', 'no-match');
            card2.element.classList.remove('flipped', 'no-match');
            card1.element.innerHTML = '?';
            card2.element.innerHTML = '?';
            
            // Cambiar de turno
            nextPlayer();
        }, 1000);
    }
    
    flippedCards = [];
    canFlip = true;
}

// Cambiar al siguiente jugador
function nextPlayer() {
    currentPlayer = (currentPlayer + 1) % numPlayers;
    updateTurn();
}

// Actualizar el turno visual
function updateTurn() {
    currentTurnText.textContent = `Turno: ${players[currentPlayer].name}`;
    
    // Resaltar el jugador actual
    document.querySelectorAll('.player-score').forEach((el, index) => {
        if (index === currentPlayer) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}

// Actualizar puntuación
function updateScore() {
    const playerDiv = document.getElementById(`player-${currentPlayer}`);
    const scoreElement = playerDiv.querySelector('.score');
    scoreElement.textContent = players[currentPlayer].score;
}

// Terminar el juego
function endGame() {
    // Encontrar al ganador (o ganadores en caso de empate)
    let maxScore = Math.max(...players.map(p => p.score));
    let winners = players.filter(p => p.score === maxScore);
    
    let winnerText = '';
    if (winners.length === 1) {
        winnerText = `<strong>🏆 ${winners[0].name} gana con ${maxScore} pareja(s)! 🏆</strong><br><br>`;
    } else {
        winnerText = `<strong>🏆 ¡Empate! 🏆</strong><br><br>`;
        winners.forEach(w => {
            winnerText += `${w.name}: ${w.score} pareja(s)<br>`;
        });
    }
    
    // Mostrar todas las puntuaciones
    winnerText += '<br><strong>Puntuaciones finales:</strong><br>';
    players.forEach(p => {
        winnerText += `${p.name}: ${p.score} pareja(s)<br>`;
    });
    
    // Nota sobre la carta sin pareja
    winnerText += `<br><em>Nota: Una carta no tiene pareja 😈</em>`;
    
    winnerInfo.innerHTML = winnerText;
    winModal.classList.remove('hidden');
}

// Reiniciar el juego
function resetGame() {
    winModal.classList.add('hidden');
    gamePanel.classList.add('hidden');
    setupPanel.classList.remove('hidden');
    
    // Resetear valores
    gridSize = 5;
    numPlayers = 2;
    numPlayersInput.value = 2;
    
    // Resetear botones de tamaño
    sizeBtns.forEach(btn => btn.classList.remove('active'));
    sizeBtns[0].classList.add('active');
}

// Función para mezclar un array (Fisher-Yates shuffle)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
