// Variables del juego
let gameMode = null; // 'local' o 'online'
let isHost = false;
let roomCode = null;
let onlinePlayers = [];
let gridSize = 5;
let numPlayers = 2;
let currentPlayer = 0;
let players = [];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let canFlip = true;

// Firebase configuration (usando una simple implementación simulada)
let roomDatabase = {};

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
const modePanel = document.getElementById('modePanel');
const onlinePanel = document.getElementById('onlinePanel');
const setupPanel = document.getElementById('setupPanel');
const gamePanel = document.getElementById('gamePanel');
const memoryGrid = document.getElementById('memoryGrid');
const playersScore = document.getElementById('playersScore');
const currentTurnText = document.getElementById('currentTurn');
const winModal = document.getElementById('winModal');
const winnerInfo = document.getElementById('winnerInfo');

// Botones de modo
const localModeBtn = document.getElementById('localModeBtn');
const onlineModeBtn = document.getElementById('onlineModeBtn');
const backToModeBtn = document.getElementById('backToModeBtn');

// Elementos de sala online
const createRoomBtn = document.getElementById('createRoomBtn');
const joinRoomBtn = document.getElementById('joinRoomBtn');
const startOnlineGameBtn = document.getElementById('startOnlineGameBtn');
const roomCodeDisplay = document.getElementById('roomCodeDisplay');
const roomCodeElement = document.getElementById('roomCode');
const joinRoomCodeInput = document.getElementById('joinRoomCode');
const playerNameInput = document.getElementById('playerName');
const playersInRoom = document.getElementById('playersInRoom');
const joinStatus = document.getElementById('joinStatus');
const onlineStatus = document.getElementById('onlineStatus');

// Botones de configuración
const sizeBtns = document.querySelectorAll('.size-btn');
const decreasePlayerBtn = document.getElementById('decreasePlayer');
const increasePlayerBtn = document.getElementById('increasePlayer');
const numPlayersInput = document.getElementById('numPlayers');
const startGameBtn = document.getElementById('startGameBtn');
const resetGameBtn = document.getElementById('resetGameBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

// Event Listeners - Configuración
localModeBtn.addEventListener('click', () => {
    gameMode = 'local';
    modePanel.classList.add('hidden');
    setupPanel.classList.remove('hidden');
});

onlineModeBtn.addEventListener('click', () => {
    gameMode = 'online';
    modePanel.classList.add('hidden');
    onlinePanel.classList.remove('hidden');
});

backToModeBtn.addEventListener('click', () => {
    onlinePanel.classList.add('hidden');
    modePanel.classList.remove('hidden');
    roomCodeDisplay.classList.add('hidden');
    joinStatus.textContent = '';
    joinStatus.className = 'join-status';
});

createRoomBtn.addEventListener('click', createRoom);
joinRoomBtn.addEventListener('click', joinRoom);
startOnlineGameBtn.addEventListener('click', startOnlineGame);

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
    setupPanel.classList.add('hidden');
    onlinePanel.classList.add('hidden');
    onlineStatus.classList.add('hidden');
    modePanel.classList.remove('hidden');
    
    // Limpiar sala online
    if (roomCode && isHost) {
        delete roomDatabase[roomCode];
    }
    roomCode = null;
    isHost = false;
    gameMode = null;
    onlinePlayers = [];
    
    // Limpiar campos
    joinRoomCodeInput.value = '';
    playerNameInput.value = '';
    joinStatus.textContent = '';
    joinStatus.className = 'join-status';
    roomCodeDisplay.classList.add('hidden');
    startOnlineGameBtn.classList.add('hidden');
    createRoomBtn.disabled = false;
    
    // Resetear valores
    gridSize = 5;
    numPlayers = 2;
    numPlayersInput.value = 2;
    
    // Resetear botones de tamaño
    sizeBtns.forEach(btn => btn.classList.remove('active'));
    sizeBtns[0].classList.add('active');
    
    // Limpiar paneles de espera si existen
    const waitingPanels = document.querySelectorAll('.setup-panel:not(#setupPanel)');
    waitingPanels.forEach(panel => panel.remove());
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

// ==================== FUNCIONES ONLINE ====================

// Generar código de sala aleatorio
function generateRoomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Crear una sala online
function createRoom() {
    roomCode = generateRoomCode();
    isHost = true;
    
    // Inicializar la sala en la "base de datos" simulada
    if (!roomDatabase[roomCode]) {
        roomDatabase[roomCode] = {
            host: 'Host',
            players: [{ id: 0, name: 'Host (Tú)', ready: true }],
            gameStarted: false,
            gameState: null
        };
    }
    
    // Mostrar código de sala
    roomCodeElement.textContent = roomCode;
    roomCodeDisplay.classList.remove('hidden');
    createRoomBtn.disabled = true;
    
    // Actualizar lista de jugadores
    updatePlayersInRoom();
    
    // Simular que otros jugadores pueden unirse
    checkRoomUpdates();
}

// Unirse a una sala
function joinRoom() {
    const code = joinRoomCodeInput.value.toUpperCase().trim();
    const playerName = playerNameInput.value.trim() || 'Jugador';
    
    if (code.length !== 6) {
        showJoinStatus('El código debe tener 6 caracteres', 'error');
        return;
    }
    
    // Verificar si la sala existe
    if (!roomDatabase[code]) {
        showJoinStatus('Sala no encontrada', 'error');
        return;
    }
    
    if (roomDatabase[code].gameStarted) {
        showJoinStatus('La partida ya comenzó', 'error');
        return;
    }
    
    // Unirse a la sala
    roomCode = code;
    isHost = false;
    
    const playerId = roomDatabase[code].players.length;
    roomDatabase[code].players.push({
        id: playerId,
        name: playerName,
        ready: true
    });
    
    showJoinStatus('¡Te has unido a la sala!', 'success');
    
    // Mostrar información de la sala
    setTimeout(() => {
        onlinePanel.classList.add('hidden');
        roomCodeDisplay.classList.remove('hidden');
        roomCodeElement.textContent = roomCode;
        
        // Crear un mini panel para mostrar que estás en la sala
        const waitingPanel = document.createElement('div');
        waitingPanel.className = 'setup-panel';
        waitingPanel.innerHTML = `
            <h2>En la sala: ${roomCode}</h2>
            <p style="color: white;">Esperando a que el host inicie el juego...</p>
            <div id="playersInRoomJoined" class="players-list" style="background: rgba(255,255,255,0.2); color: white;"></div>
        `;
        
        // Reemplazar el panel online con el de espera
        document.querySelector('.memory-container').insertBefore(waitingPanel, gamePanel);
        
        updatePlayersInRoomJoined();
        checkRoomUpdatesAsGuest();
    }, 1000);
}

// Mostrar estado de unión
function showJoinStatus(message, type) {
    joinStatus.textContent = message;
    joinStatus.className = `join-status ${type}`;
}

// Actualizar lista de jugadores en sala (host)
function updatePlayersInRoom() {
    if (!roomCode || !roomDatabase[roomCode]) return;
    
    playersInRoom.innerHTML = '';
    roomDatabase[roomCode].players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-item';
        playerDiv.textContent = player.name;
        playersInRoom.appendChild(playerDiv);
    });
    
    // Mostrar botón de iniciar si hay al menos 2 jugadores
    if (roomDatabase[roomCode].players.length >= 2) {
        startOnlineGameBtn.classList.remove('hidden');
    }
}

// Actualizar lista de jugadores (invitado)
function updatePlayersInRoomJoined() {
    const container = document.getElementById('playersInRoomJoined');
    if (!container || !roomCode || !roomDatabase[roomCode]) return;
    
    container.innerHTML = '';
    roomDatabase[roomCode].players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-item';
        playerDiv.textContent = player.name;
        container.appendChild(playerDiv);
    });
}

// Verificar actualizaciones de sala (host)
function checkRoomUpdates() {
    if (!isHost || !roomCode) return;
    
    const interval = setInterval(() => {
        if (!roomCode || roomDatabase[roomCode].gameStarted) {
            clearInterval(interval);
            return;
        }
        updatePlayersInRoom();
    }, 1000);
}

// Verificar actualizaciones de sala (invitado)
function checkRoomUpdatesAsGuest() {
    if (isHost || !roomCode) return;
    
    const interval = setInterval(() => {
        if (!roomCode) {
            clearInterval(interval);
            return;
        }
        
        updatePlayersInRoomJoined();
        
        // Si el juego empezó, iniciar
        if (roomDatabase[roomCode].gameStarted && roomDatabase[roomCode].gameState) {
            clearInterval(interval);
            loadOnlineGame(roomDatabase[roomCode].gameState);
        }
    }, 1000);
}

// Iniciar juego online (solo host)
function startOnlineGame() {
    if (!isHost || !roomCode) return;
    
    roomDatabase[roomCode].gameStarted = true;
    
    // Configurar jugadores desde la sala
    players = roomDatabase[roomCode].players.map(p => ({
        id: p.id,
        name: p.name,
        score: 0
    }));
    
    numPlayers = players.length;
    currentPlayer = 0;
    matchedPairs = 0;
    flippedCards = [];
    canFlip = true;
    
    // Crear estado del juego
    const gameState = {
        gridSize: gridSize,
        players: players,
        cards: generateCardValues()
    };
    
    roomDatabase[roomCode].gameState = gameState;
    
    // Ocultar panel online y mostrar juego
    onlinePanel.classList.add('hidden');
    roomCodeDisplay.classList.add('hidden');
    gamePanel.classList.remove('hidden');
    onlineStatus.classList.remove('hidden');
    
    // Iniciar juego
    loadOnlineGame(gameState);
}

// Generar valores de cartas
function generateCardValues() {
    const totalCards = gridSize * gridSize;
    const numPairs = Math.floor(totalCards / 2);
    
    const shuffledEmojis = shuffleArray([...emojis]);
    const selectedEmojis = shuffledEmojis.slice(0, numPairs);
    
    let cardValues = [];
    selectedEmojis.forEach(emoji => {
        cardValues.push(emoji);
        cardValues.push(emoji);
    });
    
    const lonelyEmoji = shuffledEmojis[numPairs];
    cardValues.push(lonelyEmoji);
    
    return shuffleArray(cardValues);
}

// Cargar juego online
function loadOnlineGame(gameState) {
    gridSize = gameState.gridSize;
    players = gameState.players;
    numPlayers = players.length;
    
    // Ocultar cualquier panel de espera
    const waitingPanels = document.querySelectorAll('.setup-panel');
    waitingPanels.forEach(panel => panel.classList.add('hidden'));
    
    gamePanel.classList.remove('hidden');
    onlineStatus.classList.remove('hidden');
    
    createScoreBoard();
    createCardsFromValues(gameState.cards);
    updateTurn();
}

// Crear cartas desde valores predefinidos
function createCardsFromValues(cardValues) {
    memoryGrid.innerHTML = '';
    memoryGrid.className = `memory-grid size-${gridSize}`;
    
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
