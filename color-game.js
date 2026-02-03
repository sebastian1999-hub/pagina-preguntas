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
        // Asegurarse de que la variación sea al menos 10 para que sea visible
        const variation = Math.max(10, difficulty);
        const newColor = { ...baseColor };
        
        // Intenta cada canal hasta encontrar uno donde se pueda hacer un cambio visible
        const channels = ['r', 'g', 'b'];
        let success = false;
        
        // Aleatoriza el orden de los canales
        const shuffledChannels = channels.sort(() => Math.random() - 0.5);
        
        for (const channel of shuffledChannels) {
            // Intenta aumentar
            if (baseColor[channel] + variation <= 255) {
                newColor[channel] = baseColor[channel] + variation;
                success = true;
                break;
            }
            // Intenta disminuir
            else if (baseColor[channel] - variation >= 0) {
                newColor[channel] = baseColor[channel] - variation;
                success = true;
                break;
            }
        }
        
        // Si ningún canal funcionó con la variación completa, usa el máximo posible
        if (!success) {
            for (const channel of shuffledChannels) {
                const maxIncrease = 255 - baseColor[channel];
                const maxDecrease = baseColor[channel];
                
                if (maxIncrease >= 10) {
                    newColor[channel] = Math.min(255, baseColor[channel] + Math.max(10, maxIncrease));
                    success = true;
                    break;
                } else if (maxDecrease >= 10) {
                    newColor[channel] = Math.max(0, baseColor[channel] - Math.max(10, maxDecrease));
                    success = true;
                    break;
                }
            }
        }
        
        // Última salvaguarda: si todo falla, fuerza un cambio drástico
        if (!success || (newColor.r === baseColor.r && newColor.g === baseColor.g && newColor.b === baseColor.b)) {
            // Modifica el primer canal que pueda cambiar
            if (baseColor.r < 245) {
                newColor.r = baseColor.r + 10;
            } else if (baseColor.r > 10) {
                newColor.r = baseColor.r - 10;
            } else if (baseColor.g < 245) {
                newColor.g = baseColor.g + 10;
            } else if (baseColor.g > 10) {
                newColor.g = baseColor.g - 10;
            } else if (baseColor.b < 245) {
                newColor.b = baseColor.b + 10;
            } else {
                newColor.b = baseColor.b - 10;
            }
        }
        
        return newColor;
    }

    generateLevel() {
        const gridSize = this.getGridSize();
        const difficulty = this.getDifficultyFactor();
        const totalSquares = gridSize * gridSize;
        
        // Genera el color base
        const baseColor = this.generateRandomColor();
        const differentColor = this.generateDifferentColor(baseColor, difficulty);
        
        // Debug: Verifica que los colores sean diferentes
        console.log('Base:', this.colorToString(baseColor));
        console.log('Different:', this.colorToString(differentColor));
        console.log('Are they equal?', 
            baseColor.r === differentColor.r && 
            baseColor.g === differentColor.g && 
            baseColor.b === differentColor.b
        );
        
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
            
            // Encuentra y marca el cuadrado correcto
            const allSquares = this.gridElement.querySelectorAll('.color-square');
            allSquares.forEach(sq => {
                if (sq.dataset.different === 'true') {
                    sq.classList.add('reveal-correct');
                }
            });
            
            setTimeout(() => {
                this.gameOver();
            }, 1500);
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
