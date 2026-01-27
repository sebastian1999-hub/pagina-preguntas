// Game State
let gameState = {
    gridSize: 3,
    dangerCards: 5,
    totalCards: 9,
    flippedCards: 0,
    cards: [],
    gameOver: false,
    currentPlayer: 1,
    player1: { redCards: 0, greenCards: 0 },
    player2: { redCards: 0, greenCards: 0 }
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

// Player elements
const player1Card = document.getElementById('player1Card');
const player2Card = document.getElementById('player2Card');
const player1RedEl = document.getElementById('player1Red');
const player1GreenEl = document.getElementById('player1Green');
const player2RedEl = document.getElementById('player2Red');
const player2GreenEl = document.getElementById('player2Green');

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
    gameState.player1 = { redCards: 0, greenCards: 0 };
    gameState.player2 = { redCards: 0, greenCards: 0 };
    
    // Generate cards array
    gameState.cards = generateCards();
    
    // Update UI
    setupPanel.classList.add('hidden');
    gamePanel.classList.remove('hidden');
    
    // Update info
    updateGameInfo();
    updatePlayerTurn();
    
    // Render grid
    renderGrid();
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
    const currentPlayerStats = gameState.currentPlayer === 1 ? gameState.player1 : gameState.player2;
    
    if (card.type === 'danger') {
        currentPlayerStats.redCards++;
    } else {
        currentPlayerStats.greenCards++;
    }
    
    updateGameInfo();
    
    // Check if all cards are flipped
    if (gameState.flippedCards === gameState.totalCards) {
        setTimeout(() => {
            // Determinar ganador por quien tiene menos cartas rojas
            if (gameState.player1.redCards < gameState.player2.redCards) {
                gameOver('player1');
            } else if (gameState.player2.redCards < gameState.player1.redCards) {
                gameOver('player2');
            } else {
                // Empate
                gameOver('tie');
            }
        }, 800);
        return;
    }
    
    // Cambiar de turno
    setTimeout(() => {
        gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
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
    player1RedEl.textContent = gameState.player1.redCards;
    player1GreenEl.textContent = gameState.player1.greenCards;
    player2RedEl.textContent = gameState.player2.redCards;
    player2GreenEl.textContent = gameState.player2.greenCards;
}

function updatePlayerTurn() {
    if (gameState.currentPlayer === 1) {
        player1Card.classList.add('active-player');
        player2Card.classList.remove('active-player');
    } else {
        player2Card.classList.add('active-player');
        player1Card.classList.remove('active-player');
    }
}

function gameOver(result) {
    gameState.gameOver = true;
    
    if (result === 'player1') {
        resultTitle.textContent = '¡Jugador 1 Ganó! 🎉';
        resultTitle.className = 'win';
        resultMessage.textContent = `¡Jugador 1 levantó menos cartas rojas! Jugador 1: ${gameState.player1.redCards} rojas vs Jugador 2: ${gameState.player2.redCards} rojas. ¡Jugador 2 bebe!`;
        revealAllCards();
    } else if (result === 'player2') {
        resultTitle.textContent = '¡Jugador 2 Ganó! 🎉';
        resultTitle.className = 'win';
        resultMessage.textContent = `¡Jugador 2 levantó menos cartas rojas! Jugador 1: ${gameState.player1.redCards} rojas vs Jugador 2: ${gameState.player2.redCards} rojas. ¡Jugador 1 bebe!`;
        revealAllCards();
    } else if (result === 'tie') {
        resultTitle.textContent = '¡Empate! 🤝';
        resultTitle.className = 'win';
        resultMessage.textContent = `¡Ambos jugadores levantaron ${gameState.player1.redCards} cartas rojas! ¡Los dos beben!`;
        revealAllCards();
    }
    
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
    
    // Remove active player indicators
    player1Card.classList.remove('active-player');
    player2Card.classList.remove('active-player');
    
    gameState = {
        gridSize: gameState.gridSize,
        dangerCards: parseInt(dangerCardsInput.value),
        totalCards: gameState.gridSize * gameState.gridSize,
        flippedCards: 0,
        cards: [],
        gameOver: false,
        currentPlayer: 1,
        player1: { redCards: 0, greenCards: 0 },
        player2: { redCards: 0, greenCards: 0 }
    };
}

// Initialize max cards info on load
window.addEventListener('DOMContentLoaded', () => {
    const maxDanger = gameState.totalCards - 1;
    maxCardsInfo.textContent = `Máximo: ${maxDanger}`;
});
