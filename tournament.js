// Variables del torneo
let tournamentFormat = 'eliminatorio';
let competitionType = 'individual';
let participants = [];
let teams = [];
let suizoRounds = 5;
let currentRound = 1;
let matches = [];
let standings = [];

// DOM Elements
const formatBtns = document.querySelectorAll('.format-btn');
const typeBtns = document.querySelectorAll('.type-btn');
const suizoRoundsGroup = document.getElementById('suizoRoundsGroup');
const suizoRoundsInput = document.getElementById('suizoRounds');
const participantInput = document.getElementById('participantInput');
const addParticipantBtn = document.getElementById('addParticipantBtn');
const participantsList = document.getElementById('participantsList');
const clearAllBtn = document.getElementById('clearAllBtn');
const startTournamentBtn = document.getElementById('startTournamentBtn');
const setupPanel = document.getElementById('setupPanel');
const tournamentPanel = document.getElementById('tournamentPanel');
const backToSetupBtn = document.getElementById('backToSetupBtn');
const eliminatoryView = document.getElementById('eliminatoryView');
const suizoView = document.getElementById('suizoView');
const bracketContainer = document.getElementById('bracketContainer');
const matchesContainer = document.getElementById('matchesContainer');
const standingsTable = document.getElementById('standingsTable');
const nextRoundBtn = document.getElementById('nextRoundBtn');
const currentRoundEl = document.getElementById('currentRound');
const totalRoundsEl = document.getElementById('totalRounds');
const tournamentInfo = document.getElementById('tournamentInfo');

// Event Listeners
formatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        formatBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tournamentFormat = btn.dataset.format;
        suizoRoundsGroup.style.display = tournamentFormat === 'suizo' ? 'block' : 'none';
    });
});

typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        typeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        competitionType = btn.dataset.type;
    });
});

participantInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addParticipant();
    }
});

addParticipantBtn.addEventListener('click', addParticipant);
clearAllBtn.addEventListener('click', clearAll);
startTournamentBtn.addEventListener('click', startTournament);
backToSetupBtn.addEventListener('click', backToSetup);
nextRoundBtn.addEventListener('click', nextSuizoRound);

// Functions
function addParticipant() {
    const name = participantInput.value.trim();
    if (name === '') return;
    
    participants.push({
        id: Date.now() + Math.random(),
        name: name
    });
    
    participantInput.value = '';
    renderParticipants();
}

function removeParticipant(id) {
    participants = participants.filter(p => p.id !== id);
    renderParticipants();
}

function renderParticipants() {
    participantsList.innerHTML = '';
    participants.forEach(participant => {
        const item = document.createElement('div');
        item.className = 'participant-item';
        item.innerHTML = `
            <span class="participant-name">${participant.name}</span>
            <button class="btn-remove" onclick="removeParticipant(${participant.id})">Eliminar</button>
        `;
        participantsList.appendChild(item);
    });
}

function clearAll() {
    if (confirm('¿Estás seguro de eliminar todos los participantes?')) {
        participants = [];
        renderParticipants();
    }
}

function startTournament() {
    if (participants.length < 2) {
        alert('Necesitas al menos 2 participantes para iniciar el torneo.');
        return;
    }
    
    // Crear equipos según el tipo de competición
    createTeams();
    
    // Validar número de equipos
    const minTeams = tournamentFormat === 'suizo' ? 4 : 2;
    if (teams.length < minTeams) {
        alert(`Necesitas al menos ${minTeams} ${competitionType === 'individual' ? 'participantes' : 'equipos'} para este formato.`);
        return;
    }
    
    setupPanel.style.display = 'none';
    tournamentPanel.style.display = 'block';
    
    const typeText = competitionType === 'individual' ? 'Individual' : 
                     competitionType === 'parejas' ? 'Parejas' : 'Tríos';
    const formatText = tournamentFormat === 'eliminatorio' ? 'Eliminatorio' : 'Sistema Suizo';
    tournamentInfo.textContent = `${formatText} - ${typeText} (${teams.length} ${competitionType === 'individual' ? 'participantes' : 'equipos'})`;
    
    if (tournamentFormat === 'eliminatorio') {
        startEliminatory();
    } else {
        startSuizo();
    }
}

function createTeams() {
    teams = [];
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    
    if (competitionType === 'individual') {
        teams = shuffled.map(p => ({
            id: p.id,
            name: p.name,
            members: [p.name],
            wins: 0,
            draws: 0,
            losses: 0,
            points: 0
        }));
    } else {
        const teamSize = competitionType === 'parejas' ? 2 : 3;
        for (let i = 0; i < shuffled.length; i += teamSize) {
            const teamMembers = shuffled.slice(i, i + teamSize);
            if (teamMembers.length === teamSize) {
                teams.push({
                    id: Date.now() + i,
                    name: teamMembers.map(m => m.name).join(' & '),
                    members: teamMembers.map(m => m.name),
                    wins: 0,
                    draws: 0,
                    losses: 0,
                    points: 0
                });
            }
        }
    }
}

// === ELIMINATORIO ===
function startEliminatory() {
    eliminatoryView.style.display = 'block';
    suizoView.style.display = 'none';
    
    generateEliminatoryBracket();
}

function generateEliminatoryBracket() {
    // Calcular potencia de 2 más cercana
    const nextPowerOf2 = Math.pow(2, Math.ceil(Math.log2(teams.length)));
    const byes = nextPowerOf2 - teams.length;
    
    // Mezclar equipos
    const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
    
    // Primera ronda con byes
    let currentRoundMatches = [];
    for (let i = 0; i < shuffledTeams.length; i += 2) {
        if (i + 1 < shuffledTeams.length) {
            currentRoundMatches.push({
                team1: shuffledTeams[i],
                team2: shuffledTeams[i + 1],
                winner: null
            });
        } else {
            // Bye - pasa automáticamente
            currentRoundMatches.push({
                team1: shuffledTeams[i],
                team2: null,
                winner: shuffledTeams[i]
            });
        }
    }
    
    renderEliminatoryBracket(currentRoundMatches);
}

function renderEliminatoryBracket(initialMatches) {
    bracketContainer.innerHTML = '';
    let allRounds = [initialMatches];
    let currentMatches = initialMatches;
    
    // Generar todas las rondas hasta la final
    while (currentMatches.length > 1) {
        const nextRound = [];
        for (let i = 0; i < currentMatches.length; i += 2) {
            nextRound.push({
                team1: null,
                team2: null,
                winner: null,
                previousMatches: [i, i + 1]
            });
        }
        allRounds.push(nextRound);
        currentMatches = nextRound;
    }
    
    // Renderizar rondas
    allRounds.forEach((roundMatches, roundIndex) => {
        const roundDiv = document.createElement('div');
        roundDiv.className = 'round';
        
        const roundTitle = document.createElement('div');
        roundTitle.className = 'round-title';
        roundTitle.textContent = roundIndex === allRounds.length - 1 ? 'Final' :
                                 roundIndex === allRounds.length - 2 ? 'Semifinal' :
                                 `Ronda ${roundIndex + 1}`;
        roundDiv.appendChild(roundTitle);
        
        const matchesDiv = document.createElement('div');
        matchesDiv.className = 'matches';
        
        roundMatches.forEach((match, matchIndex) => {
            const matchDiv = document.createElement('div');
            matchDiv.className = 'match';
            matchDiv.dataset.round = roundIndex;
            matchDiv.dataset.match = matchIndex;
            
            if (roundIndex === 0) {
                // Primera ronda - mostrar equipos
                const team1Div = createMatchParticipant(match.team1, match, 1, roundIndex, matchIndex);
                const team2Div = match.team2 ? createMatchParticipant(match.team2, match, 2, roundIndex, matchIndex) : 
                                              createByeParticipant();
                
                matchDiv.appendChild(team1Div);
                matchDiv.appendChild(team2Div);
            } else {
                // Rondas siguientes - esperar ganadores
                const team1Div = createMatchParticipant(match.team1, match, 1, roundIndex, matchIndex);
                const team2Div = createMatchParticipant(match.team2, match, 2, roundIndex, matchIndex);
                
                matchDiv.appendChild(team1Div);
                matchDiv.appendChild(team2Div);
            }
            
            matchesDiv.appendChild(matchDiv);
        });
        
        roundDiv.appendChild(matchesDiv);
        bracketContainer.appendChild(roundDiv);
    });
}

function createMatchParticipant(team, match, teamNumber, roundIndex, matchIndex) {
    const div = document.createElement('div');
    div.className = 'match-participant';
    div.textContent = team ? team.name : 'Esperando...';
    
    if (team && !match.winner) {
        div.style.cursor = 'pointer';
        div.onclick = () => selectWinner(team, match, roundIndex, matchIndex);
    }
    
    if (match.winner && match.winner.id === team?.id) {
        div.classList.add('winner');
    }
    
    return div;
}

function createByeParticipant() {
    const div = document.createElement('div');
    div.className = 'match-participant bye';
    div.textContent = 'BYE';
    return div;
}

function selectWinner(team, match, roundIndex, matchIndex) {
    if (match.winner) return;
    
    match.winner = team;
    
    // Actualizar vista
    const matchDiv = document.querySelector(`[data-round="${roundIndex}"][data-match="${matchIndex}"]`);
    const participants = matchDiv.querySelectorAll('.match-participant');
    participants.forEach(p => {
        p.classList.remove('winner');
        if (p.textContent === team.name) {
            p.classList.add('winner');
        }
    });
    
    // Avanzar ganador a siguiente ronda
    const nextRoundMatch = Math.floor(matchIndex / 2);
    const nextRoundDiv = document.querySelector(`[data-round="${roundIndex + 1}"][data-match="${nextRoundMatch}"]`);
    
    if (nextRoundDiv) {
        const nextMatchParticipants = nextRoundDiv.querySelectorAll('.match-participant');
        const position = matchIndex % 2;
        nextMatchParticipants[position].textContent = team.name;
        nextMatchParticipants[position].onclick = () => {
            // Necesitamos encontrar el match correcto
            const allRounds = getAllRounds();
            if (allRounds[roundIndex + 1] && allRounds[roundIndex + 1][nextRoundMatch]) {
                const nextMatch = allRounds[roundIndex + 1][nextRoundMatch];
                if (position === 0) {
                    nextMatch.team1 = team;
                } else {
                    nextMatch.team2 = team;
                }
                selectWinner(team, nextMatch, roundIndex + 1, nextRoundMatch);
            }
        };
    }
}

function getAllRounds() {
    const rounds = [];
    const roundDivs = bracketContainer.querySelectorAll('.round');
    roundDivs.forEach(roundDiv => {
        const matchDivs = roundDiv.querySelectorAll('.match');
        const roundMatches = [];
        matchDivs.forEach(matchDiv => {
            roundMatches.push({}); // Placeholder
        });
        rounds.push(roundMatches);
    });
    return rounds;
}

// === SISTEMA SUIZO ===
function startSuizo() {
    eliminatoryView.style.display = 'none';
    suizoView.style.display = 'block';
    
    suizoRounds = parseInt(suizoRoundsInput.value);
    currentRound = 1;
    
    // Inicializar estadísticas
    teams.forEach(team => {
        team.wins = 0;
        team.draws = 0;
        team.losses = 0;
        team.points = 0;
        team.opponents = [];
    });
    
    generateSuizoRound();
}

function generateSuizoRound() {
    currentRoundEl.textContent = currentRound;
    totalRoundsEl.textContent = suizoRounds;
    
    // Ordenar equipos por puntos y emparejar
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
    matches = [];
    const paired = new Set();
    
    for (let i = 0; i < sortedTeams.length; i++) {
        if (paired.has(sortedTeams[i].id)) continue;
        
        // Buscar oponente adecuado
        for (let j = i + 1; j < sortedTeams.length; j++) {
            if (paired.has(sortedTeams[j].id)) continue;
            if (!sortedTeams[i].opponents.includes(sortedTeams[j].id)) {
                matches.push({
                    team1: sortedTeams[i],
                    team2: sortedTeams[j],
                    result1: null,
                    result2: null
                });
                paired.add(sortedTeams[i].id);
                paired.add(sortedTeams[j].id);
                sortedTeams[i].opponents.push(sortedTeams[j].id);
                sortedTeams[j].opponents.push(sortedTeams[i].id);
                break;
            }
        }
    }
    
    renderSuizoMatches();
    updateStandings();
    nextRoundBtn.style.display = 'none';
}

function renderSuizoMatches() {
    matchesContainer.innerHTML = '';
    
    matches.forEach((match, index) => {
        const matchDiv = document.createElement('div');
        matchDiv.className = 'suizo-match';
        
        const title = document.createElement('h4');
        title.textContent = `Enfrentamiento ${index + 1}`;
        matchDiv.appendChild(title);
        
        // Team 1
        const team1Div = createSuizoParticipant(match.team1, match, 1, index);
        matchDiv.appendChild(team1Div);
        
        // Team 2
        const team2Div = createSuizoParticipant(match.team2, match, 2, index);
        matchDiv.appendChild(team2Div);
        
        matchesContainer.appendChild(matchDiv);
    });
}

function createSuizoParticipant(team, match, teamNumber, matchIndex) {
    const div = document.createElement('div');
    div.className = 'suizo-participant';
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'suizo-participant-name';
    nameSpan.textContent = team.name;
    div.appendChild(nameSpan);
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'result-buttons';
    
    const winBtn = document.createElement('button');
    winBtn.className = 'result-btn win';
    winBtn.textContent = 'Victoria';
    winBtn.onclick = () => setResult(matchIndex, teamNumber, 'win');
    if (match[`result${teamNumber}`] === 'win') winBtn.classList.add('selected');
    
    const drawBtn = document.createElement('button');
    drawBtn.className = 'result-btn draw';
    drawBtn.textContent = 'Empate';
    drawBtn.onclick = () => setResult(matchIndex, teamNumber, 'draw');
    if (match[`result${teamNumber}`] === 'draw') drawBtn.classList.add('selected');
    
    const lossBtn = document.createElement('button');
    lossBtn.className = 'result-btn loss';
    lossBtn.textContent = 'Derrota';
    lossBtn.onclick = () => setResult(matchIndex, teamNumber, 'loss');
    if (match[`result${teamNumber}`] === 'loss') lossBtn.classList.add('selected');
    
    buttonsDiv.appendChild(winBtn);
    buttonsDiv.appendChild(drawBtn);
    buttonsDiv.appendChild(lossBtn);
    
    div.appendChild(buttonsDiv);
    
    return div;
}

function setResult(matchIndex, teamNumber, result) {
    const match = matches[matchIndex];
    const otherTeam = teamNumber === 1 ? 2 : 1;
    
    match[`result${teamNumber}`] = result;
    
    // Establecer resultado del otro equipo automáticamente
    if (result === 'win') {
        match[`result${otherTeam}`] = 'loss';
    } else if (result === 'loss') {
        match[`result${otherTeam}`] = 'win';
    } else if (result === 'draw') {
        match[`result${otherTeam}`] = 'draw';
    }
    
    renderSuizoMatches();
    checkAllResultsEntered();
}

function checkAllResultsEntered() {
    const allEntered = matches.every(m => m.result1 !== null && m.result2 !== null);
    
    if (allEntered) {
        // Actualizar estadísticas
        matches.forEach(match => {
            if (match.result1 === 'win') {
                match.team1.wins++;
                match.team1.points += 3;
                match.team2.losses++;
            } else if (match.result1 === 'loss') {
                match.team1.losses++;
                match.team2.wins++;
                match.team2.points += 3;
            } else if (match.result1 === 'draw') {
                match.team1.draws++;
                match.team1.points += 1;
                match.team2.draws++;
                match.team2.points += 1;
            }
        });
        
        updateStandings();
        
        if (currentRound < suizoRounds) {
            nextRoundBtn.style.display = 'block';
        } else {
            nextRoundBtn.textContent = 'Ver Campeón';
            nextRoundBtn.style.display = 'block';
            nextRoundBtn.onclick = showWinner;
        }
    }
}

function nextSuizoRound() {
    currentRound++;
    generateSuizoRound();
}

function updateStandings() {
    const sortedTeams = [...teams].sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.wins !== a.wins) return b.wins - a.wins;
        return a.losses - b.losses;
    });
    
    standingsTable.innerHTML = '';
    sortedTeams.forEach((team, index) => {
        const item = document.createElement('div');
        item.className = 'standing-item';
        
        item.innerHTML = `
            <div class="standing-position">${index + 1}</div>
            <div class="standing-name">${team.name}</div>
            <div class="standing-stats">${team.points} pts</div>
            <div class="standing-stats">${team.wins}V-${team.draws}E-${team.losses}D</div>
        `;
        
        standingsTable.appendChild(item);
    });
}

function showWinner() {
    const sortedTeams = [...teams].sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.wins !== a.wins) return b.wins - a.wins;
        return a.losses - b.losses;
    });
    
    const winner = sortedTeams[0];
    alert(`🏆 ¡Campeón del Torneo! 🏆\n\n${winner.name}\n\nPuntos: ${winner.points}\nVictorias: ${winner.wins}`);
}

function backToSetup() {
    if (confirm('¿Estás seguro de volver? Se perderá el progreso del torneo.')) {
        setupPanel.style.display = 'block';
        tournamentPanel.style.display = 'none';
        eliminatoryView.style.display = 'none';
        suizoView.style.display = 'none';
    }
}

// Make removeParticipant global
window.removeParticipant = removeParticipant;
