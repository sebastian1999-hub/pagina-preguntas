// Sistema de items del Gacha
const gachaItems = {
    legendary: [
        {
            name: "Chupito Legendario",
            icon: "🏆",
            description: "¡Toma 5 chupitos seguidos sin agua! El grupo te aclama.",
            rarity: "legendary"
        },
        {
            name: "El Rey de la Fiesta",
            icon: "👑",
            description: "Eres inmune a retos durante 3 rondas, pero debes bailar cada vez que alguien beba.",
            rarity: "legendary"
        },
        {
            name: "Ruleta Rusa",
            icon: "🎯",
            description: "Elige a 3 personas. Una de ellas (al azar) debe tomar el doble de chupitos.",
            rarity: "legendary"
        }
    ],
    epic: [
        {
            name: "Desafío Épico",
            icon: "⚔️",
            description: "Compite en piedra, papel o tijera. Mejor de 3. El perdedor toma 3 chupitos.",
            rarity: "epic"
        },
        {
            name: "Verdad o Consecuencia",
            icon: "🎭",
            description: "Elige verdad o consecuencia. Si mientes o rechazas, toma 4 chupitos.",
            rarity: "epic"
        },
        {
            name: "El Maestro",
            icon: "🎓",
            description: "Inventa una regla que todos deben seguir durante 10 minutos. Quien falle, bebe.",
            rarity: "epic"
        },
        {
            name: "Intercambio",
            icon: "🔄",
            description: "Intercambia tu bebida con la de otra persona de tu elección.",
            rarity: "epic"
        }
    ],
    rare: [
        {
            name: "Doble o Nada",
            icon: "🎲",
            description: "Lanza una moneda. Cara = reparte 2 chupitos. Cruz = tomas 2 chupitos.",
            rarity: "rare"
        },
        {
            name: "Karaoke Improvisado",
            icon: "🎤",
            description: "Canta 30 segundos de tu canción favorita o toma 2 chupitos.",
            rarity: "rare"
        },
        {
            name: "El Imitador",
            icon: "🎪",
            description: "Imita a alguien del grupo durante 2 minutos. Si adivinan antes de tiempo, tomas 1 chupito.",
            rarity: "rare"
        },
        {
            name: "Trabalenguas",
            icon: "👅",
            description: "Di 'tres tristes tigres' 5 veces rápido. Cada error = 1 chupito.",
            rarity: "rare"
        },
        {
            name: "Ronda Gratis",
            icon: "🎁",
            description: "¡Felicidades! Reparte 2 chupitos a quien quieras.",
            rarity: "rare"
        }
    ],
    uncommon: [
        {
            name: "Mini Reto",
            icon: "⭐",
            description: "Haz 10 flexiones o toma 1 chupito.",
            rarity: "uncommon"
        },
        {
            name: "Pregunta Picante",
            icon: "🌶️",
            description: "Responde una pregunta incómoda del grupo o toma 1 chupito.",
            rarity: "uncommon"
        },
        {
            name: "El Mimo",
            icon: "🤐",
            description: "No puedes hablar durante 3 minutos. Si hablas, tomas 1 chupito.",
            rarity: "uncommon"
        },
        {
            name: "Baile Obligatorio",
            icon: "💃",
            description: "Baila durante 30 segundos. Si te niegas, toma 1 chupito.",
            rarity: "uncommon"
        },
        {
            name: "El Poeta",
            icon: "📝",
            description: "Improvisa una rima de 4 versos o toma 1 chupito.",
            rarity: "uncommon"
        },
        {
            name: "Mano Izquierda",
            icon: "👈",
            description: "Solo puedes usar tu mano izquierda durante 5 minutos. Si fallas, 1 chupito.",
            rarity: "uncommon"
        }
    ],
    common: [
        {
            name: "Chupito Simple",
            icon: "🥃",
            description: "Toma 1 chupito tranquilamente.",
            rarity: "common"
        },
        {
            name: "Reparte Uno",
            icon: "👉",
            description: "Elige a alguien para que tome 1 chupito.",
            rarity: "common"
        },
        {
            name: "Sin Consecuencias",
            icon: "😌",
            description: "¡Tienes suerte! No pasa nada esta vez.",
            rarity: "common"
        },
        {
            name: "Salud por Todos",
            icon: "🍻",
            description: "Todos toman un sorbo de su bebida.",
            rarity: "common"
        },
        {
            name: "El Generoso",
            icon: "💚",
            description: "Dale un cumplido sincero a alguien del grupo.",
            rarity: "common"
        },
        {
            name: "Historia Corta",
            icon: "📖",
            description: "Cuenta una anécdota graciosa en 30 segundos.",
            rarity: "common"
        },
        {
            name: "Trago de Agua",
            icon: "💧",
            description: "Toma un vaso de agua. ¡Hidrátate!",
            rarity: "common"
        },
        {
            name: "Fotito",
            icon: "📸",
            description: "Todos se toman una foto grupal.",
            rarity: "common"
        }
    ]
};

// Probabilidades de rareza
const rarityChances = {
    legendary: 0.01,  // 1%
    epic: 0.05,       // 5%
    rare: 0.14,       // 14%
    uncommon: 0.30,   // 30%
    common: 0.50      // 50%
};

// Estadísticas
let stats = {
    totalPulls: 0,
    legendary: 0,
    epic: 0,
    rare: 0,
    uncommon: 0,
    common: 0
};

// Elementos del DOM
const pullBtn = document.getElementById('pullBtn');
const gachaBox = document.getElementById('gachaBox');
const resultCard = document.getElementById('resultCard');

// Función para determinar la rareza
function determineRarity() {
    const random = Math.random();
    let cumulative = 0;
    
    for (const [rarity, chance] of Object.entries(rarityChances)) {
        cumulative += chance;
        if (random <= cumulative) {
            return rarity;
        }
    }
    
    return 'common';
}

// Función para obtener un item aleatorio
function getRandomItem(rarity) {
    const items = gachaItems[rarity];
    return items[Math.floor(Math.random() * items.length)];
}

// Función para mostrar resultado
function displayResult(item) {
    const placeholder = gachaBox.querySelector('.gacha-placeholder');
    if (placeholder) {
        placeholder.style.display = 'none';
    }
    
    // Ocultar el gacha-box cuando aparece el resultado
    gachaBox.style.display = 'none';
    
    resultCard.style.display = 'block';
    resultCard.className = `result-card ${item.rarity}`;
    
    // Mostrar la imagen correspondiente a la rareza
    const imageMap = {
        'legendary': 'fotosGatcha/legendario.jpeg',
        'epic': 'fotosGatcha/epico.jpg',
        'rare': 'fotosGatcha/rare.jpg',
        'uncommon': 'fotosGatcha/poco comun.jpg',
        'common': 'fotosGatcha/comun.jpg'
    };
    
    const resultImage = document.getElementById('resultImage');
    resultImage.src = imageMap[item.rarity];
    resultImage.alt = item.rarity.toUpperCase();
    
    document.getElementById('resultRarity').textContent = item.rarity.toUpperCase();
    
    // Actualizar estadísticas
    stats.totalPulls++;
    stats[item.rarity]++;
    updateStats();
}

// Función para actualizar estadísticas
function updateStats() {
    document.getElementById('totalPulls').textContent = stats.totalPulls;
    document.getElementById('legendaryCount').textContent = stats.legendary;
    document.getElementById('epicCount').textContent = stats.epic;
    document.getElementById('rareCount').textContent = stats.rare;
}

// Animación de pulling
function animatePull() {
    resultCard.style.display = 'none';
    gachaBox.style.display = 'block';
    const placeholder = gachaBox.querySelector('.gacha-placeholder');
    if (placeholder) {
        placeholder.style.display = 'block';
        placeholder.innerHTML = '<span class="placeholder-icon spinning">🎰</span><p>¡Sacando item...</p>';
    }
}

// Event listeners
pullBtn.addEventListener('click', () => {
    animatePull();
    
    setTimeout(() => {
        const rarity = determineRarity();
        const item = getRandomItem(rarity);
        displayResult(item);
    }, 1500);
});

// Estilo CSS adicional para animación de spinning
const style = document.createElement('style');
style.textContent = `
    .spinning {
        animation: spin 0.5s linear infinite !important;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
   