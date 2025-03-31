const characters = {
    NHLin: { health: 70, energy: 80, oxygen: 100, description: "Weak, Fast... Like a chicken in Ohio!" },
    BSK: { health: 90, energy: 80, oxygen: 100, description: "Strong, Quick... Like a squirrel in Ohio!" },
    Darren: { health: 70, energy: 90, oxygen: 100, description: "Quick, Strong... Probably invented sliced bread!" },
    Hao: { health: 80, energy: 80, oxygen: 100, description: "Strong, Black... He once won a staring contest with a mirror!" },
    Steve: { health: 90, energy: 85, oxygen: 100, description: "Calm, Analytical... Can even calm a raging coffee machine!" },
    Jaden: { health: 80, energy: 120, oxygen: 100, description: "Fast, Engaging... Always has a swim at the ready!" },
    Albert: { health: 165, energy: 65, oxygen: 100, description: "slow, Focused... He's chasing his dreams, one NHLin at a time!" },
    Noah: { health: 80, energy: 85, oxygen: 100, description: "Smart, Slow... Could outsmart a fridge in a power cut!" },
    Galvin: { health: 85, energy: 80, oxygen: 100, description: "Fearless, Brave... Once tried to pet a e-gi**!" },
    Nevin: { health: 70, energy: 70, oxygen: 100, description: "Slow, Calm... Knows the best Skibidi Watcher!" },
    Jorgina: { health: 85, energy: 65, oxygen: 100, description: "Surprising, Quick... She once jump-started a car with two spoons!" },
    Vivien: { health: 90, energy: 80, oxygen: 100, description: "Charming, Witty... Could charm the socks off a statue!" },
    Yanxi: { health: 75, energy: 75, oxygen: 100, description: "Resourceful, Clever... Uses moan to fix everything!" },
    Junteng: { health: 85, energy: 70, oxygen: 100, description: "Strong, Brave... Wrestled a bear... and lost with a hug!" },
    Jeff: { health: 145, energy: 60, oxygen: 100, description: "Smart, Analytical, Calm, Fearless, Brave, Fat... Calculates the best NHLin Gyat!" },
    JeffLai: { health: 80, energy: 65, oxygen: 100, description: "Slow , Ambitious... Can order pizza in zero languages!" },
    Ethan: { health: 70, energy: 75, oxygen: 100, description: "Quick... Runs like a cheetah... after kfcs!" },
    Aeryn: { health: 80, energy: 70, oxygen: 100, description: "Ambitious, Driven... Wants to become a professional ice cream taster!" },
    Javier: { health: 90, energy: 80, oxygen: 100, description: "Bold, Adventurous... Took his goldfish to the beach!" },
    Iris: { health: 80, energy: 70, oxygen: 100, description: "Wise, Calm... Should probably run a meditation retreat!" },
    Fredrick: { health: 70, energy: 95, oxygen: 100, description: "Unique, Energyful... Could sell sand in a desert!" },
    Eddy: { health: 85, energy: 120, oxygen: 100, description: "Fun, Innovative... Can turn any event into a surprise dance party!" },
    CHZ: { health: 80, energy: 80, oxygen: 100, description: "Mysterious, Intriguing... Might be a part-time superhero!" },
};

let playerCharacter = null;
let bots = [];
let gameTurns = 0;
const maxTurns = 10;

function initCharacterSelection() {
    const characterSelection = document.getElementById('character-selection');
    characterSelection.innerHTML = '<h2>Select Your Character</h2>';
    for (const name in characters) {
        characterSelection.innerHTML += `
            <button class="game-button" onclick="selectCharacter('${name}')">${name}</button>
        `;
    }
}

function selectCharacter(name) {
    playerCharacter = { name, ...characters[name] };
    bots = [];
    for (let i = 0; i < 3; i++) {
        const randomCharacterKey = Object.keys(characters)[Math.floor(Math.random() * Object.keys(characters).length)];
        const randomCharacter = characters[randomCharacterKey];
        bots.push({ name: `Bot${i + 1}`, ...randomCharacter });
    }
    document.getElementById('fortune-button').disabled = false;
    updateStatusDisplay();
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function calculateNewStatus(character, diceRoll) {
    character.oxygen += diceRoll;
    character.energy = Math.max(0, character.energy - 4);
}

function renderBars(character) {
    return `
        <div class="bar health" style="--health-percent: ${character.health}%;"><strong>${character.health} HP</strong></div>
        <div class="bar energy" style="--energy-percent: ${character.energy}%;"><strong>${character.energy} EN</strong></div>
        <div class="bar oxygen" style="--oxygen-percent: ${character.oxygen}%;"><strong>${character.oxygen} O2</strong></div>
    `;
}

function updateStatusDisplay() {
    const statusDisplay = document.getElementById('status-display');
    statusDisplay.innerHTML = `
        <div class="character-card">
            <strong>Your Character:</strong><br>
            ${playerCharacter.name}<br>
            ${playerCharacter.description}<br>
            ${renderBars(playerCharacter)}
            <button onclick="openAbilityModal()" class="game-button">Activate Ability</button>
        </div>
    `;
    
    bots.forEach(bot => {
        statusDisplay.innerHTML += `
            <div class="character-card">
                <strong>${bot.name} (Bot):</strong><br>
                ${bot.description}<br>
                ${renderBars(bot)}
            </div>
        `;
    });
}

function openAbilityModal() {
    const modal = document.getElementById('ability-modal');
    const description = document.getElementById('ability-description');
    description.textContent = playerCharacter.description;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('ability-modal').style.display = 'none';
}

function useAbility() {
    if (playerCharacter.energy >= 20) {
        playerCharacter.energy -= 20;
        playerCharacter.oxygen += 20;
        updateStatusDisplay();
        closeModal();
    } else {
        showEventModal('Not enough energy to use ability!', 'warning');
    }
}

function showEventModal(text, type = 'info') {
    const modal = document.getElementById('event-modal');
    const description = document.getElementById('event-description');
    description.textContent = text;
    modal.style.display = 'block';
}

function closeEventModal() {
    document.getElementById('event-modal').style.display = 'none';
}

const randomEvents = [
    "A sudden wind boosts your energy! +10 Energy",
    "You found an oxygen tank! +15 Oxygen",
    "A mischievous creature steals your energy! -10 Energy",
    "You accidentally inhale too much confetti! -5 Oxygen",
    "You discovered a hidden energy drink! +15 Energy",
    "A mysterious fog reduces oxygen! -10 Oxygen",
    "You made some new friends who help you! +10 Oxygen",
    "You found a special ability boost! +20 Energy",
    "You got lost in the forest! -15 Oxygen",
    "You met a wise old man who helps you! +25 Energy"
];

function triggerRandomEvent(character) {
    const eventIndex = Math.floor(Math.random() * randomEvents.length);
    const eventText = randomEvents[eventIndex];
    
    switch(eventIndex) {
        case 0: case 4: case 7:
            character.energy += parseInt(eventText.split('+')[1].split(' ')[0]);
            break;
        case 1: case 6:
            character.oxygen += parseInt(eventText.split('+')[1].split(' ')[0]);
            break;
        case 2: case 3: case 5: case 8:
            character.energy -= parseInt(eventText.split('-')[1].split(' ')[0]);
            break;
        case 9:
            character.oxygen -= parseInt(eventText.split('-')[1].split(' ')[0]);
            break;
    }

    showEventModal(eventText);
}

function calculateScore(character) {
    return character.health + character.energy + character.oxygen;
}

function endGame() {
    const playerScore = calculateScore(playerCharacter);
    const botScores = bots.map(bot => calculateScore(bot));
    const highestScore = Math.max(playerScore, ...botScores);
    let winner = '';
    
    if (playerScore === highestScore) {
        winner = 'You';
    } else {
        winner = `Bot ${botScores.indexOf(highestScore) + 1}`;
    }

    const gameOverDiv = document.getElementById('game-over');
    const winnerText = document.getElementById('winner-text');
    winnerText.textContent = `The winner is: ${winner} with a score of ${highestScore}!`;

    // Generate leaderboard
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = '<h3>Leaderboard</h3>';
    const participants = [{ name: 'You', score: playerScore }, ...bots.map((bot, index) => ({ name: `Bot ${index + 1}`, score: botScores[index] }))];
    participants.sort((a, b) => b.score - a.score);
    participants.forEach(participant => {
        leaderboard.innerHTML += `<p>${participant.name}: ${participant.score} points</p>`;
    });

    gameOverDiv.style.display = 'block';
    document.getElementById('fortune-button').disabled = true;
}

function playAgain() {
    gameTurns = 0;
    playerCharacter = null;
    bots = [];
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('fortune-button').disabled = true;
    initCharacterSelection();
}