class ColorGame {
    constructor() {
        this.level = 1;
        this.score = 0;
        this.bestStreak = parseInt(localStorage.getItem('colorGameBestStreak')) || 0;
        this.startTime = Date.now();
        this.isPaused = false;
        this.timerInterval = null;
        
        this.gridElement = document.getElementById('color-grid');
        this.levelElement = document.getElementById('level');
        this.scoreElement = document.getElementById('score');
        this.bestStreakElement = document.getElementById('best-streak');
        this.timerElement = document.getElementById('timer');
        this.restartBtn = document.getElementById('restart-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.gameOverModal = document.getElementById('game-over-modal');
        this.playAgainBtn = document.getElementById('play-again-btn');
        
        this.initEventListeners();
        this.startTimer();
        this.generateLevel();
        this.updateUI();
    }

    initEventListeners() {
        this.restartBtn.addEventListener('click', () => this.restart());
        this.pauseBtn.addEventListener('click', () => this.togglePause());
        this.playAgainBtn.addEventListener('click', () => {
            this.gameOverModal.classList.add('hidden');
            this.restart();
        });
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            if (!this.isPaused) {
                const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
                this.timerElement.textContent = `${elapsed}s`;
            }
        }, 1000);
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            this.pauseBtn.textContent = '▶️ Reanudar';
            this.gridElement.style.pointerEvents = 'none';
            this.gridElement.style.opacity = '0.5';
        } else {
            this.pauseBtn.textContent = '⏸️ Pausar';
            this.gridElement.style.pointerEvents = 'auto';
            this.gridElement.style.opacity = '1';
        }
    }

    getGridSize() {
        // Aumenta el tamaño de la cuadrícula según el nivel
        if (this.level <= 3) return 2; // 2x2 = 4 cuadrados
        if (this.level <= 6) return 3; // 3x3 = 9 cuadrados
        if (this.level <= 10) return 4; // 4x4 = 16 cuadrados
        if (this.level <= 15) return 5; // 5x5 = 25 cuadrados
        return 6; // 6x6 = 36 cuadrados
    }

    getDifficultyFactor() {
        // Reduce la diferencia de color según el nivel
        // Comienza con 50 y disminuye hasta un mínimo de 5
        return Math.max(5, 50 - (this.level * 2));
    }

    generateRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return { r, g, b };
    }

    colorToString(color) {
        return `rgb(${color.r}, ${color.g}, ${color.b})`;
    }

    generateDifferentColor(baseColor, difficulty) {
        const variation = difficulty;
        const newColor = { ...baseColor };
        
        // Elige aleatoriamente qué canal de color modificar
        const channels = ['r', 'g', 'b'];
        const channelToModify = channels[Math.floor(Math.random() * channels.length)];
        
        // Modifica el canal seleccionado
        const direction = Math.random() > 0.5 ? 1 : -1;
        newColor[channelToModify] = Math.max(0, Math.min(255, 
            newColor[channelToModify] + (variation * direction)
        ));
        
        return newColor;
    }

    generateLevel() {
        const gridSize = this.getGridSize();
        const difficulty = this.getDifficultyFactor();
        const totalSquares = gridSize * gridSize;
        
        // Genera el color base
        const baseColor = this.generateRandomColor();
        const differentColor = this.generateDifferentColor(baseColor, difficulty);
        
        // Elige aleatoriamente qué cuadrado será diferente
        const differentIndex = Math.floor(Math.random() * totalSquares);
        
        // Limpia la cuadrícula
        this.gridElement.innerHTML = '';
        
        // Configura el grid CSS
        this.gridElement.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        
        // Crea los cuadrados
        for (let i = 0; i < totalSquares; i++) {
            const square = document.createElement('div');
            square.className = 'color-square';
            
            if (i === differentIndex) {
                square.style.backgroundColor = this.colorToString(differentColor);
                square.dataset.different = 'true';
            } else {
                square.style.backgroundColor = this.colorToString(baseColor);
                square.dataset.different = 'false';
            }
            
            square.addEventListener('click', () => this.handleSquareClick(square));
            this.gridElement.appendChild(square);
        }
    }

    handleSquareClick(square) {
        if (this.isPaused) return;
        
        const isDifferent = square.dataset.different === 'true';
        
        if (isDifferent) {
            // ¡Correcto!
            square.classList.add('correct');
            this.score += this.level * 10;
            this.level++;
            
            if (this.level - 1 > this.bestStreak) {
                this.bestStreak = this.level - 1;
                localStorage.setItem('colorGameBestStreak', this.bestStreak);
            }
            
            setTimeout(() => {
                this.generateLevel();
                this.updateUI();
            }, 500);
        } else {
            // ¡Incorrecto!
            square.classList.add('wrong');
            setTimeout(() => {
                this.gameOver();
            }, 500);
        }
    }

    updateUI() {
        this.levelElement.textContent = this.level;
        this.scoreElement.textContent = this.score;
        this.bestStreakElement.textContent = this.bestStreak;
    }

    gameOver() {
        clearInterval(this.timerInterval);
        
        const finalTime = Math.floor((Date.now() - this.startTime) / 1000);
        document.getElementById('final-level').textContent = this.level - 1;
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('final-time').textContent = `${finalTime}s`;
        
        this.gameOverModal.classList.remove('hidden');
    }

    restart() {
        clearInterval(this.timerInterval);
        this.level = 1;
        this.score = 0;
        this.startTime = Date.now();
        this.isPaused = false;
        this.pauseBtn.textContent = '⏸️ Pausar';
        this.gridElement.style.pointerEvents = 'auto';
        this.gridElement.style.opacity = '1';
        
        this.startTimer();
        this.generateLevel();
        this.updateUI();
    }
}

// Iniciar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new ColorGame();
});
