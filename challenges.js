// Variables del juego
let challenges = [];
let flippedCards = new Set();

// Elementos del DOM
const setupPanel = document.getElementById('setupPanel');
const gamePanel = document.getElementById('gamePanel');
const challengeInput = document.getElementById('challengeInput');
const addChallengeBtn = document.getElementById('addChallengeBtn');
const challengeList = document.getElementById('challengeList');
const challengeCount = document.getElementById('challengeCount');
const startChallengesBtn = document.getElementById('startChallengesBtn');
const resetChallengesBtn = document.getElementById('resetChallengesBtn');
const cardsGrid = document.getElementById('cardsGrid');
const cardsRemaining = document.getElementById('cardsRemaining');

// Event Listeners
addChallengeBtn.addEventListener('click', addChallenge);
challengeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addChallenge();
    }
});

startChallengesBtn.addEventListener('click', startGame);
resetChallengesBtn.addEventListener('click', resetGame);

// Función para agregar un reto
function addChallenge() {
    const text = challengeInput.value.trim();
    
    if (text === '') {
        alert('Por favor escribe un reto o castigo');
        return;
    }
    
    challenges.push(text);
    challengeInput.value = '';
    updateChallengeList();
    updateStartButton();
}

// Actualizar la lista de retos
function updateChallengeList() {
    challengeCount.textContent = challenges.length;
    
    if (challenges.length === 0) {
        challengeList.innerHTML = '<p class="challenge-list-empty">No hay retos agregados aún...</p>';
        return;
    }
    
    challengeList.innerHTML = '';
    challenges.forEach((challenge, index) => {
        const item = document.createElement('div');
        item.className = 'challenge-item';
        item.innerHTML = `
            <span>${challenge}</span>
            <button class="remove-btn" onclick="removeChallenge(${index})">✕</button>
        `;
        challengeList.appendChild(item);
    });
}

// Eliminar un reto
function removeChallenge(index) {
    challenges.splice(index, 1);
    updateChallengeList();
    updateStartButton();
}

// Actualizar botón de inicio
function updateStartButton() {
    startChallengesBtn.disabled = challenges.length === 0;
}

// Iniciar el juego
function startGame() {
    if (challenges.length === 0) return;
    
    // Barajar los retos
    const shuffledChallenges = shuffleArray([...challenges]);
    
    // Ocultar setup y mostrar juego
    setupPanel.classList.add('hidden');
    gamePanel.classList.remove('hidden');
    
    // Crear las tarjetas
    createCards(shuffledChallenges);
    
    // Actualizar contador
    updateCardsRemaining();
}

// Crear las tarjetas
function createCards(challengesArray) {
    cardsGrid.innerHTML = '';
    flippedCards.clear();
    
    challengesArray.forEach((challenge, index) => {
        const card = document.createElement('div');
        card.className = 'challenge-card';
        card.dataset.index = index;
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <span>?</span>
                </div>
                <div class="card-back">
                    <p>${challenge}</p>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => flipCard(card, index));
        cardsGrid.appendChild(card);
    });
}

// Voltear una tarjeta
function flipCard(cardElement, index) {
    if (cardElement.classList.contains('completed')) {
        return;
    }
    
    cardElement.classList.toggle('flipped');
    
    // Si se voltea hacia atrás (se oculta el reto), marcarlo como completado
    if (!cardElement.classList.contains('flipped')) {
        cardElement.classList.add('completed');
        flippedCards.add(index);
        updateCardsRemaining();
        
        // Verificar si todas las tarjetas fueron completadas
        if (flippedCards.size === challenges.length) {
            setTimeout(() => {
                alert('🎉 ¡Todos los retos han sido completados! 🎉');
            }, 500);
        }
    }
}

// Actualizar contador de tarjetas restantes
function updateCardsRemaining() {
    const remaining = challenges.length - flippedCards.size;
    cardsRemaining.textContent = remaining;
}

// Reiniciar el juego
function resetGame() {
    gamePanel.classList.add('hidden');
    setupPanel.classList.remove('hidden');
    flippedCards.clear();
}

// Función para barajar un array (Fisher-Yates shuffle)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Inicializar
updateChallengeList();
updateStartButton();
