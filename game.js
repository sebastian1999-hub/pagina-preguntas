// Game State
let gameState = {
    gridSize: 3,
    dangerCards: 5,
    totalCards: 9,
    flippedCards: 0,
    cards: [],
    gameOver: false
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
    
    // Generate cards array
    gameState.cards = generateCards();
    
    // Update UI
    setupPanel.classList.add('hidden');
    gamePanel.classList.remove('hidden');
    
    // Update info
    updateGameInfo();
    
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
    
    updateGameInfo();
    
    // Check if danger card
    if (card.type === 'danger') {
        setTimeout(() => {
            gameOver(false);
        }, 800);
    } else {
        // Check if won
        const remainingSafe = gameState.cards.filter(c => c.type === 'safe' && !c.flipped).length;
        if (remainingSafe === 0) {
            setTimeout(() => {
                gameOver(true);
            }, 800);
        }
    }
}

function updateGameInfo() {
    const remaining = gameState.totalCards - gameState.flippedCards;
    const dangerRemaining = gameState.cards.filter(c => c.type === 'danger' && !c.flipped).length;
    const safeRemaining = gameState.cards.filter(c => c.type === 'safe' && !c.flipped).length;
    
    remainingCardsEl.textContent = remaining;
    dangerCountEl.textContent = dangerRemaining;
    safeCountEl.textContent = safeRemaining;
}

function gameOver(won) {
    gameState.gameOver = true;
    
    if (won) {
        resultTitle.textContent = '¡Ganaste! 🎉';
        resultTitle.className = 'win';
        resultMessage.textContent = 'tu contrincante se bebe su vaso del tiron, enhorabuena!';
    } else {
        resultTitle.textContent = '¡Perdiste! 💀';
        resultTitle.className = 'lose';
        resultMessage.textContent = '¡Ups! a tomar por saco te toca beber campeon!';
        
        // Reveal all cards
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
    
    gameState = {
        gridSize: gameState.gridSize,
        dangerCards: parseInt(dangerCardsInput.value),
        totalCards: gameState.gridSize * gameState.gridSize,
        flippedCards: 0,
        cards: [],
        gameOver: false
    };
}

// Initialize max cards info on load
window.addEventListener('DOMContentLoaded', () => {
    const maxDanger = gameState.totalCards - 1;
    maxCardsInfo.textContent = `Máximo: ${maxDanger}`;
});
