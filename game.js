let playerCharacter = JSON.parse(localStorage.getItem('playerCharacter'));
let bots = [];
let gameTurns = 0;
const maxTurns = 10;

function initGame() {
    generateBots();
    updateStatusDisplay();
    document.getElementById('fortune-button').disabled = false;
}

function generateBots() {
    for (let i = 0; i < 3; i++) {
        const randomCharacterKey = Object.keys(characters)[Math.floor(Math.random() * Object.keys(characters).length)];
        bots.push({ name: `Bot${i + 1}`, ...characters[randomCharacterKey] });
    }
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
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
    statusDisplay.innerHTML = `<div><strong>Your Character:</strong><br>${playerCharacter.name}<br>${playerCharacter.description}<br>${renderBars(playerCharacter)}<br><button onclick="activateAbility(playerCharacter)">Activate Ability</button></div>`;
    for (const bot of bots) {
        statusDisplay.innerHTML += `<div><strong>${bot.name}:</strong><br>${bot.description}<br>${renderBars(bot)}</div>`;
    }
}

function triggerRandomEvent(character) {
    const events = [
        { message: "A sudden wind boosts your energy! +10 Energy", effect: { energy: 10 } },
        { message: "You found an oxygen tank! +15 Oxygen", effect: { oxygen: 15 } },
        { message: "A mischievous creature steals your energy! -10 Energy", effect: { energy: -10 } },
        { message: "You accidentally inhale too much confetti! -5 Oxygen", effect: { oxygen: -5 } }
    ];

    const eventIndex = Math.floor(Math.random() * events.length);
    const selectedEvent = events[eventIndex];

    character.energy = Math.max(0, character.energy + (selectedEvent.effect.energy || 0));
    character.oxygen = Math.max(0, character.oxygen + (selectedEvent.effect.oxygen || 0));

    showModal(selectedEvent.message);
}

function miniGame() {
    const success = Math.random() < 0.5; // 50% chance of success
    if(success) {
        playerCharacter.health = Math.min(100, playerCharacter.health + 10); // Heal up to 100
        showModal("You won the mini-game! +10 Health");
    } else {
        playerCharacter.health = Math.max(0, playerCharacter.health - 10);
        showModal("You lost the mini-game! -10 Health");
    }
}

function showModal(message) {
    document.getElementById('modal-message').innerText = message;
    document.getElementById('message-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('message-modal').style.display = 'none';
}

document.getElementById('fortune-button').addEventListener('click', () => {
    if (gameTurns < maxTurns) {
        miniGame(); // Call mini-game on turn
        gameTurns++;
        const diceValue = rollDice();
        playerCharacter.oxygen += diceValue;
        playerCharacter.energy = Math.max(0, playerCharacter.energy - 4);
        
        triggerRandomEvent(playerCharacter);
        
        bots.forEach(bot => {
            const botDiceValue = rollDice();
            bot.oxygen += botDiceValue;
            bot.energy = Math.max(0, bot.energy - 4);
            triggerRandomEvent(bot);
        });

        updateStatusDisplay();

        if (gameTurns === maxTurns) {
            endGame();
        }
    }
});

function endGame() {
    const playerScore = calculateScore(playerCharacter);
    updateLeaderboard(playerScore); // Update the leaderboard with current score
    const gameOverDiv = document.getElementById('game-over');
    gameOverDiv.style.display = 'block';
    document.getElementById('fortune-button').disabled = true;
}

function calculateScore(character) {
    return character.health + character.energy + character.oxygen;
}

function resetGame() {
    localStorage.removeItem('playerCharacter'); // Clear character
    window.location.href = 'index.html'; // Redirect back to selection
}

function playAgain() {
    gameTurns = 0; 
    bots = []; 
    initGame(); // Restart the game
}

document.addEventListener('DOMContentLoaded', (event) => {
    if (document.getElementById('status-display')) {
        initGame();
    }
});