// Game State
let gameState = {
    gridSize: 3,
    dangerCards: 5,
    totalCards: 9,
    flippedCards: 0,
    cards: [],
    gameOver: false,
    currentPlayer: 1,
    numPlayers: 2,
    players: []
};

// DOM Elements
const setupPanel = document.getElementById('setupPanel');
const gamePanel = document.getElementById('gamePanel');
const grid = document.getElementById('grid');
const dangerCardsInput = document.getElementById('dangerCards');
const maxCardsInfo = document.getElementById('maxCards');
const startGameBtn = document.getElementById('startGame');
const resetGameBtn = document.getElementById('resetGame');
const playAgainBtn = document.getElementById('playAgain');
const resultModal = document.getElementById('resultModal');
const resultTitle = document.getElementById('resultTitle');
const resultMessage = document.getElementById('resultMessage');
const remainingCardsEl = document.getElementById('remainingCards');
const dangerCountEl = document.getElementById('dangerCount');
const safeCountEl = document.getElementById('safeCount');
const numPlayersInput = document.getElementById('numPlayers');
const playersContainer = document.getElementById('playersContainer');

// Size buttons
const sizeBtns = document.querySelectorAll('.size-btn');

// Event Listeners
sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        sizeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        gameState.gridSize = parseInt(btn.dataset.size);
        gameState.totalCards = gameState.gridSize * gameState.gridSize;
        
        // Update max danger cards
        const maxDanger = gameState.totalCards - 1;
        dangerCardsInput.max = maxDanger;
        maxCardsInfo.textContent = `Máximo: ${maxDanger}`;
        
        // Adjust danger cards if needed
        if (parseInt(dangerCardsInput.value) > maxDanger) {
            dangerCardsInput.value = maxDanger;
        }
    });
});

dangerCardsInput.addEventListener('input', () => {
    const maxDanger = gameState.totalCards - 1;
    if (parseInt(dangerCardsInput.value) > maxDanger) {
        dangerCardsInput.value = maxDanger;
    }
    if (parseInt(dangerCardsInput.value) < 1) {
        dangerCardsInput.value = 1;
    }
});

numPlayersInput.addEventListener('input', () => {
    if (parseInt(numPlayersInput.value) > 16) {
        numPlayersInput.value = 16;
    }
    if (parseInt(numPlayersInput.value) < 2) {
        numPlayersInput.value = 2;
    }
});

startGameBtn.addEventListener('click', startGame);
resetGameBtn.addEventListener('click', resetToSetup);
playAgainBtn.addEventListener('click', () => {
    resultModal.classList.add('hidden');
    resetToSetup();
});

// Functions
function startGame() {
    gameState.dangerCards = parseInt(dangerCardsInput.value);
    gameState.totalCards = gameState.gridSize * gameState.gridSize;
    gameState.flippedCards = 0;
    gameState.gameOver = false;
    gameState.currentPlayer = 1;
    gameState.numPlayers = parseInt(numPlayersInput.value);
    
    // Inicializar jugadores
    gameState.players = [];
    for (let i = 1; i <= gameState.numPlayers; i++) {
        gameState.players.push({ id: i, redCards: 0, greenCards: 0 });
    }
    
    // Generate cards array
    gameState.cards = generateCards();
    
    // Update UI
    setupPanel.classList.add('hidden');
    gamePanel.classList.remove('hidden');
    
    // Generar tarjetas de jugadores
    renderPlayers();
    
    // Update info
    updateGameInfo();
    updatePlayerTurn();
    
    // Render grid
    renderGrid();
}

function renderPlayers() {
    playersContainer.innerHTML = '';
    gameState.players.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.id = `player${player.id}Card`;
        playerCard.innerHTML = `
            <h3>Jugador ${player.id}</h3>
            <div class="player-stats">
                <div class="stat-item">
                    <span class="stat-label">Cartas rojas:</span>
                    <span id="player${player.id}Red" class="stat-value danger">0</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Cartas verdes:</span>
                    <span id="player${player.id}Green" class="stat-value safe">0</span>
                </div>
            </div>
        `;
        playersContainer.appendChild(playerCard);
    });
}

function generateCards() {
    const cards = [];
    
    // Add danger cards
    for (let i = 0; i < gameState.dangerCards; i++) {
        cards.push({ type: 'danger', flipped: false });
    }
    
    // Add safe cards
    for (let i = 0; i < gameState.totalCards - gameState.dangerCards; i++) {
        cards.push({ type: 'safe', flipped: false });
    }
    
    // Shuffle cards
    return shuffleArray(cards);
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function renderGrid() {
    grid.innerHTML = '';
    grid.className = `grid size-${gameState.gridSize}`;
    
    gameState.cards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back ${card.type}">
                    ${card.type === 'danger' ? '💀' : '✨'}
                </div>
            </div>
        `;
        
        cardEl.addEventListener('click', () => flipCard(index, cardEl));
        grid.appendChild(cardEl);
    });
}

function flipCard(index, cardEl) {
    if (gameState.gameOver || gameState.cards[index].flipped || cardEl.classList.contains('flipped')) {
        return;
    }
    
    const card = gameState.cards[index];
    card.flipped = true;
    cardEl.classList.add('flipped');
    gameState.flippedCards++;
    
    // Update current player's stats
    const currentPlayer = gameState.players[gameState.currentPlayer - 1];
    
    if (card.type === 'danger') {
        currentPlayer.redCards++;
    } else {
        currentPlayer.greenCards++;
    }
    
    updateGameInfo();
    
    // Check if all cards are flipped
    if (gameState.flippedCards === gameState.totalCards) {
        setTimeout(() => {
            determineWinner();
        }, 800);
        return;
    }
    
    // Cambiar de turno
    setTimeout(() => {
        gameState.currentPlayer = (gameState.currentPlayer % gameState.numPlayers) + 1;
        updatePlayerTurn();
    }, 500);
}

function updateGameInfo() {
    const remaining = gameState.totalCards - gameState.flippedCards;
    const dangerRemaining = gameState.cards.filter(c => c.type === 'danger' && !c.flipped).length;
    const safeRemaining = gameState.cards.filter(c => c.type === 'safe' && !c.flipped).length;
    
    remainingCardsEl.textContent = remaining;
    dangerCountEl.textContent = dangerRemaining;
    safeCountEl.textContent = safeRemaining;
    
    // Update player stats
    gameState.players.forEach(player => {
        const redEl = document.getElementById(`player${player.id}Red`);
        const greenEl = document.getElementById(`player${player.id}Green`);
        if (redEl) redEl.textContent = player.redCards;
        if (greenEl) greenEl.textContent = player.greenCards;
    });
}

function updatePlayerTurn() {
    gameState.players.forEach(player => {
        const playerCard = document.getElementById(`player${player.id}Card`);
        if (playerCard) {
            if (player.id === gameState.currentPlayer) {
                playerCard.classList.add('active-player');
            } else {
                playerCard.classList.remove('active-player');
            }
        }
    });
}

function determineWinner() {
    gameState.gameOver = true;
    
    // Encontrar el jugador con menos cartas rojas
    let minRedCards = Math.min(...gameState.players.map(p => p.redCards));
    let winners = gameState.players.filter(p => p.redCards === minRedCards);
    
    if (winners.length === 1) {
        // Un solo ganador
        const winner = winners[0];
        const losers = gameState.players.filter(p => p.id !== winner.id);
        
        resultTitle.textContent = `¡Jugador ${winner.id} Ganó! 🎉`;
        resultTitle.className = 'win';
        
        let message = `¡Jugador ${winner.id} levantó solo ${winner.redCards} carta${winner.redCards !== 1 ? 's' : ''} roja${winner.redCards !== 1 ? 's' : ''}!\n\n`;
        message += `Los demás jugadores beben:\n`;
        losers.forEach(loser => {
            message += `Jugador ${loser.id}: ${loser.redCards} cartas rojas\n`;
        });
        
        resultMessage.textContent = message;
    } else {
        // Empate entre varios jugadores
        const winnerIds = winners.map(w => w.id).join(', ');
        resultTitle.textContent = '¡Empate! 🤝';
        resultTitle.className = 'win';
        
        let message = `¡Los jugadores ${winnerIds} empataron con ${minRedCards} carta${minRedCards !== 1 ? 's' : ''} roja${minRedCards !== 1 ? 's' : ''} cada uno!\n\n`;
        
        const losers = gameState.players.filter(p => p.redCards > minRedCards);
        if (losers.length > 0) {
            message += `Los demás jugadores beben:\n`;
            losers.forEach(loser => {
                message += `Jugador ${loser.id}: ${loser.redCards} cartas rojas\n`;
            });
        } else {
            message += '¡Todos empatan! ¡Todos beben!';
        }
        
        resultMessage.textContent = message;
    }
    
    revealAllCards();
    
    setTimeout(() => {
        resultModal.classList.remove('hidden');
    }, 500);
}

function revealAllCards() {
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach((cardEl, index) => {
        if (!gameState.cards[index].flipped) {
            setTimeout(() => {
                cardEl.classList.add('flipped');
            }, index * 50);
        }
    });
}

function resetToSetup() {
    setupPanel.classList.remove('hidden');
    gamePanel.classList.add('hidden');
    resultModal.classList.add('hidden');
    
    // Clear players container
    playersContainer.innerHTML = '';
    
    gameState = {
        gridSize: gameState.gridSize,
        dangerCards: parseInt(dangerCardsInput.value),
        totalCards: gameState.gridSize * gameState.gridSize,
        flippedCards: 0,
        cards: [],
        gameOver: false,
        currentPlayer: 1,
        numPlayers: parseInt(numPlayersInput.value),
        players: []
    };
}

// Initialize max cards info on load
window.addEventListener('DOMContentLoaded', () => {
    const maxDanger = gameState.totalCards - 1;
    maxCardsInfo.textContent = `Máximo: ${maxDanger}`;
});
