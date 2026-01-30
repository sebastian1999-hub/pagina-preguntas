// Juego de Supervivencia - Eliminación por turnos

// Variables del juego
let numPlayers = 4;
let gridSize = 9;
let currentPlayerIndex = 0;
let roundNumber = 1;
let grid = [];
let players = [];
let currentRoundSelections = [];
let gameActive = false;
let isProcessingTurn = false;

// Colores para los jugadores
const playerColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#E74C3C', '#3498DB', '#2ECC71', '#F39C12',
    '#9B59B6', '#1ABC9C', '#E67E22', '#95A5A6'
];

// Elementos del DOM
const setupScreen = document.getElementById('setupScreen');
const gameScreen = document.getElementById('gameScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const gridContainer = document.getElementById('gridContainer');
const currentPlayerEl = document.getElementById('currentPlayer');
const roundNumberEl = document.getElementById('roundNumber');
const playersAliveEl = document.getElementById('playersAlive');
const selectionMessage = document.getElementById('selectionMessage');
const startGameBtn = document.getElementById('startGameBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

// Botones de configuración
const playerBtns = document.querySelectorAll('.player-btn');
const gridBtns = document.querySelectorAll('.grid-btn');

// Event Listeners para configuración
playerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        playerBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        numPlayers = parseInt(btn.dataset.players);
    });
});

gridBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        gridBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        gridSize = parseInt(btn.dataset.size);
    });
});

startGameBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', resetGame);

// Funciones principales
function startGame() {
    // Inicializar jugadores
    players = [];
    for (let i = 0; i < numPlayers; i++) {
        players.push({
            id: i + 1,
            name: `Jugador ${i + 1}`,
            color: playerColors[i],
            alive: true,
            currentPosition: null
        });
    }
    
    // Crear cuadrícula
    createGrid();
    
    // Iniciar juego
    gameActive = true;
    isProcessingTurn = false;
    currentPlayerIndex = 0;
    roundNumber = 1;
    currentRoundSelections = [];
    
    // Mostrar pantalla de juego
    setupScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    
    updateGameInfo();
}

function createGrid() {
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    
    grid = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = {
            id: i,
            eliminated: false,
            playerId: null
        };
        grid.push(cell);
        
        const cellElement = document.createElement('div');
        cellElement.className = 'grid-cell';
        cellElement.dataset.cellId = i;
        cellElement.addEventListener('click', () => selectCell(i));
        gridContainer.appendChild(cellElement);
    }
}

function selectCell(cellId) {
    if (!gameActive || isProcessingTurn) return;
    
    const cell = grid[cellId];
    const currentPlayer = players[currentPlayerIndex];
    
    // Verificar si el jugador ya seleccionó en esta ronda
    const alreadySelected = currentRoundSelections.some(s => s.playerId === currentPlayer.id);
    if (alreadySelected) {
        return; // Ignorar clics adicionales del mismo jugador
    }
    
    // Verificar si la celda es válida
    if (cell.eliminated || cell.playerId !== null) {
        selectionMessage.textContent = '❌ Esa casilla no está disponible. Elige otra.';
        selectionMessage.style.color = '#e74c3c';
        return;
    }
    
    // Bloquear más clics mientras se procesa
    isProcessingTurn = true;
    
    // Si el jugador ya había seleccionado, deshacer selección anterior
    if (currentPlayer.currentPosition !== null) {
        const prevCell = grid[currentPlayer.currentPosition];
        prevCell.playerId = null;
        const prevCellEl = document.querySelector(`[data-cell-id="${currentPlayer.currentPosition}"]`);
        prevCellEl.style.backgroundColor = '';
        prevCellEl.textContent = '';
    }
    
    // Asignar celda al jugador
    cell.playerId = currentPlayer.id;
    currentPlayer.currentPosition = cellId;
    
    // Actualizar visualmente
    const cellElement = document.querySelector(`[data-cell-id="${cellId}"]`);
    cellElement.style.backgroundColor = currentPlayer.color;
    cellElement.textContent = `P${currentPlayer.id}`;
    cellElement.style.color = 'white';
    cellElement.style.fontWeight = 'bold';
    
    selectionMessage.textContent = `✓ ${currentPlayer.name} seleccionó su casilla`;
    selectionMessage.style.color = '#27ae60';
    
    // Registrar selección
    currentRoundSelections.push({
        playerId: currentPlayer.id,
        cellId: cellId
    });
    
    // Pasar al siguiente jugador
    setTimeout(() => {
        nextTurn();
    }, 800);
}

function nextTurn() {
    // Buscar siguiente jugador vivo
    do {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    } while (!players[currentPlayerIndex].alive);
    
    const alivePlayers = players.filter(p => p.alive);
    
    // Si todos los jugadores vivos han seleccionado
    if (currentRoundSelections.length === alivePlayers.length) {
        setTimeout(() => {
            eliminatePosition();
        }, 1000);
    } else {
        // Desbloquear para el siguiente jugador
        isProcessingTurn = false;
        updateGameInfo();
    }
}

function eliminatePosition() {
    // Calcular número de casillas a eliminar (crece linealmente con la ronda)
    const cellsToEliminate = roundNumber;
    
    selectionMessage.textContent = `💀 Eliminando ${cellsToEliminate} casilla${cellsToEliminate > 1 ? 's' : ''}...`;
    selectionMessage.style.color = '#e74c3c';
    
    // Obtener todas las posiciones disponibles (no eliminadas)
    const availablePositions = grid
        .map((cell, index) => ({ cell, index }))
        .filter(item => !item.cell.eliminated)
        .map(item => item.index);
    
    if (availablePositions.length === 0) {
        endGame();
        return;
    }
    
    // Limitar el número de casillas a eliminar a las disponibles
    const actualCellsToEliminate = Math.min(cellsToEliminate, availablePositions.length);
    
    // Seleccionar posiciones aleatorias para eliminar
    const eliminatedCellIds = [];
    const shuffledPositions = [...availablePositions].sort(() => Math.random() - 0.5);
    for (let i = 0; i < actualCellsToEliminate; i++) {
        eliminatedCellIds.push(shuffledPositions[i]);
    }
    
    // Animar eliminación de todas las celdas
    eliminatedCellIds.forEach(cellId => {
        const cellElement = document.querySelector(`[data-cell-id="${cellId}"]`);
        cellElement.classList.add('eliminating');
    });
    
    setTimeout(() => {
        // Procesar cada celda eliminada
        eliminatedCellIds.forEach(eliminatedCellId => {
            // Marcar celda como eliminada
            grid[eliminatedCellId].eliminated = true;
            
            // Encontrar y eliminar jugador(es) en esa celda
            const eliminatedPlayers = players.filter(p => p.currentPosition === eliminatedCellId);
            eliminatedPlayers.forEach(player => {
                player.alive = false;
                player.currentPosition = null;
            });
            
            // Actualizar visualmente
            const cellElement = document.querySelector(`[data-cell-id="${eliminatedCellId}"]`);
            cellElement.style.backgroundColor = '#2c3e50';
            cellElement.textContent = '☠️';
            cellElement.classList.remove('eliminating');
            cellElement.classList.add('eliminated');
        });
        
        // Limpiar posiciones de jugadores vivos para siguiente ronda
        players.forEach(p => {
            if (p.alive) {
                if (p.currentPosition !== null && !eliminatedCellIds.includes(p.currentPosition)) {
                    const cell = grid[p.currentPosition];
                    cell.playerId = null;
                    const cellEl = document.querySelector(`[data-cell-id="${p.currentPosition}"]`);
                    cellEl.style.backgroundColor = '';
                    cellEl.textContent = '';
                }
                p.currentPosition = null;
            }
        });
        
        // Verificar condición de fin
        const alivePlayers = players.filter(p => p.alive);
        if (alivePlayers.length <= 1) {
            setTimeout(() => endGame(), 1500);
        } else {
            // Siguiente ronda
            currentRoundSelections = [];
            roundNumber++;
            currentPlayerIndex = players.findIndex(p => p.alive);
            isProcessingTurn = false; // Desbloquear para la nueva ronda
            
            setTimeout(() => {
                updateGameInfo();
                selectionMessage.textContent = 'Nueva ronda - Selecciona tu casilla';
                selectionMessage.style.color = '#3498db';
            }, 1500);
        }
    }, 1500);
}

function updateGameInfo() {
    const currentPlayer = players[currentPlayerIndex];
    const alivePlayers = players.filter(p => p.alive);
    
    currentPlayerEl.textContent = currentPlayer.name;
    currentPlayerEl.style.color = currentPlayer.color;
    roundNumberEl.textContent = roundNumber;
    playersAliveEl.textContent = alivePlayers.length;
    
    selectionMessage.textContent = `${currentPlayer.name}, selecciona una casilla`;
    selectionMessage.style.color = currentPlayer.color;
}

function endGame() {
    gameActive = false;
    const alivePlayers = players.filter(p => p.alive);
    
    gameScreen.style.display = 'none';
    gameOverScreen.style.display = 'flex';
    
    const winnersContainer = document.getElementById('winnersContainer');
    const gameOverTitle = document.getElementById('gameOverTitle');
    
    if (alivePlayers.length === 0) {
        gameOverTitle.textContent = '💀 Todos Eliminados 💀';
        winnersContainer.innerHTML = '<p class="no-winners">¡Nadie sobrevivió!</p>';
    } else if (alivePlayers.length === 1) {
        gameOverTitle.textContent = '🎉 ¡Tenemos un Ganador! 🎉';
        winnersContainer.innerHTML = `
            <div class="winner" style="background: ${alivePlayers[0].color}">
                <h3>${alivePlayers[0].name}</h3>
                <p>🏆 Sobrevivió ${roundNumber} rondas</p>
            </div>
        `;
    } else {
        gameOverTitle.textContent = '🏆 Ganadores 🏆';
        winnersContainer.innerHTML = alivePlayers.map(player => `
            <div class="winner" style="background: ${player.color}">
                <h3>${player.name}</h3>
            </div>
        `).join('');
    }
}

function resetGame() {
    gameOverScreen.style.display = 'none';
    setupScreen.style.display = 'flex';
}

// Actualizar badge de tiradas del gacha
const gachaTicketBadge = document.getElementById('gachaTicketBadge');
if (gachaTicketBadge) {
    const tickets = parseInt(localStorage.getItem('gachaTickets') || '0');
    gachaTicketBadge.textContent = tickets;
}
