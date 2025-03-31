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
    characterSelection.innerHTML = ''; // Clear existing content
    const heading = document.createElement('h2');
    heading.textContent = 'Select Your Character';
    characterSelection.appendChild(heading);

    for (const name in characters) {
        const button = document.createElement('button');
        button.className = 'game-button';
        button.textContent = name;
        button.onclick = () => selectCharacter(name);
        characterSelection.appendChild(button);
    }
}

function selectCharacter(name) {
    playerCharacter = { name, ...characters[name], ability: getCharacterAbility(name) };
    bots = Array.from({ length: 3 }, (_, i) => {
        const randomCharacterKey = Object.keys(characters)[Math.floor(Math.random() * Object.keys(characters).length)];
        return { name: `Bot${i + 1}`, ...characters[randomCharacterKey], ability: getCharacterAbility(randomCharacterKey) };
    });
    document.getElementById('fortune-button').disabled = false;
    updateStatusDisplay();
    document.getElementById('character-selection').style.display = 'none';
    document.getElementById('status-display').style.display = 'block';
}

function getCharacterAbility(name) {
    const abilities = {
        NHLin: () => ({ energyBoost: 15, oxygenBoost: 0 }),
        BSK: () => ({ energyBoost: 0, oxygenBoost: 20 }),
        Darren: () => ({ energyBoost: 10, oxygenBoost: 10 }),
        Hao: () => ({ energyBoost: 20, oxygenBoost: 0 }),
        Steve: () => ({ energyBoost: 5, oxygenBoost: 25 }),
        Jaden: () => ({ energyBoost: 25, oxygenBoost: 5 }),
        Albert: () => ({ energyBoost: 0, oxygenBoost: 30 }),
        Noah: () => ({ energyBoost: 15, oxygenBoost: 15 }),
        Galvin: () => ({ energyBoost: 10, oxygenBoost: 20 }),
        Nevin: () => ({ energyBoost: 20, oxygenBoost: 10 }),
        Jorgina: () => ({ energyBoost: 5, oxygenBoost: 25 }),
        Vivien: () => ({ energyBoost: 25, oxygenBoost: 5 }),
        Yanxi: () => ({ energyBoost: 15, oxygenBoost: 15 }),
        Junteng: () => ({ energyBoost: 10, oxygenBoost: 20 }),
        Jeff: () => ({ energyBoost: 20, oxygenBoost: 10 }),
        JeffLai: () => ({ energyBoost: 5, oxygenBoost: 25 }),
        Ethan: () => ({ energyBoost: 25, oxygenBoost: 5 }),
        Aeryn: () => ({ energyBoost: 15, oxygenBoost: 15 }),
        Javier: () => ({ energyBoost: 10, oxygenBoost: 20 }),
        Iris: () => ({ energyBoost: 20, oxygenBoost: 10 }),
        Fredrick: () => ({ energyBoost: 5, oxygenBoost: 25 }),
        Eddy: () => ({ energyBoost: 25, oxygenBoost: 5 }),
        CHZ: () => ({ energyBoost: 15, oxygenBoost: 15 }),
    };
    return abilities[name] || (() => ({ energyBoost: 0, oxygenBoost: 0 }));
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
    statusDisplay.innerHTML = ''; // Clear existing content

    const playerCard = document.createElement('div');
    playerCard.className = 'character-card';
    playerCard.innerHTML = `
        <strong>Your Character:</strong><br>
        ${playerCharacter.name}<br>
        ${playerCharacter.description}<br>
        ${renderBars(playerCharacter)}<br>
    `;
    const abilityButton = document.createElement('button');
    abilityButton.className = 'game-button';
    abilityButton.textContent = 'Activate Ability';
    abilityButton.onclick = () => activateAbility(playerCharacter);
    playerCard.appendChild(abilityButton);
    statusDisplay.appendChild(playerCard);

    bots.forEach(bot => {
        const botCard = document.createElement('div');
        botCard.className = 'character-card';
        botCard.innerHTML = `
            <strong>${bot.name} (character):</strong><br>
            ${bot.description}<br>
            ${renderBars(bot)}
        `;
        statusDisplay.appendChild(botCard);
    });
}

function activateAbility(character) {
    const abilityEffect = character.ability();
    character.oxygen += abilityEffect.oxygenBoost;
    character.energy += abilityEffect.energyBoost;

    const eventMessage = document.getElementById('event-message');
    eventMessage.innerHTML = ''; // Clear existing content
    const messageDiv = document.createElement('div');
    messageDiv.className = 'event-message';
    messageDiv.textContent = `${character.name} activated their special ability! Energy +${abilityEffect.energyBoost}, Oxygen +${abilityEffect.oxygenBoost}.`;
    eventMessage.appendChild(messageDiv);
}

function triggerRandomEvent(character) {
    const events = [
        { message: "A sudden wind boosts your energy! +10 Energy", effect: () => character.energy += 10 },
        { message: "You found an oxygen tank! +15 Oxygen", effect: () => character.oxygen += 15 },
        { message: "A mischievous creature steals your energy! -10 Energy", effect: () => character.energy = Math.max(0, character.energy - 10) },
        { message: "You accidentally inhale too much confetti! -5 Oxygen", effect: () => character.oxygen = Math.max(0, character.oxygen - 5) },
        { message: "You found a lucky charm! +5 to all stats!", effect: () => { character.energy += 5; character.oxygen += 5; character.health += 5; } },
        { message: "You stumbled upon a hidden stash! +20 Energy", effect: () => character.energy += 20 },
        { message: "You encountered a friendly alien! +20 Oxygen", effect: () => character.oxygen += 20 },
        { message: "You faced a sudden challenge! -15 Energy", effect: () => character.energy = Math.max(0, character.energy - 15) },
        { message: "You faced a sudden challenge! -15 Oxygen", effect: () => character.oxygen = Math.max(0, character.oxygen - 15) },
    ];
    const event = events[Math.floor(Math.random() * events.length)];
    event.effect();

    const eventMessage = document.getElementById('event-message');
    eventMessage.innerHTML = ''; // Clear existing content
    const messageDiv = document.createElement('div');
    messageDiv.className = 'event-message';
    messageDiv.textContent = event.message;
    eventMessage.appendChild(messageDiv);
}

function calculateScore(character) {
    return character.health + character.energy + character.oxygen;
}

function displayScores() {
    const playerScore = calculateScore(playerCharacter);
    const botScores = bots.map(bot => calculateScore(bot));
    document.getElementById('event-message').innerHTML = `<div class="event-message">Your total score is: ${playerScore}. Bots' scores are: ${botScores.map((score, index) => `Bot${index + 1}: ${score}`).join(', ')}</div>`;
}

function endGame() {
    const playerScore = calculateScore(playerCharacter);
    const botScores = bots.map(bot => calculateScore(bot));
    const highestScore = Math.max(playerScore, ...botScores);
    const winner = playerScore === highestScore ? 'You' : `Bot ${botScores.indexOf(highestScore) + 1}`;

    const gameOverDiv = document.getElementById('game-over');
    gameOverDiv.innerHTML = ''; // Clear existing content
    const heading = document.createElement('h2');
    heading.textContent = 'Game Over!';
    const winnerMessage = document.createElement('p');
    winnerMessage.textContent = `The winner is: ${winner} with a score of ${highestScore}!`;
    const playAgainButton = document.createElement('button');
    playAgainButton.className = 'game-button';
    playAgainButton.textContent = 'Play Again';
    playAgainButton.onclick = playAgain;

    gameOverDiv.appendChild(heading);
    gameOverDiv.appendChild(winnerMessage);
    gameOverDiv.appendChild(playAgainButton);
    gameOverDiv.style.display = 'block';

    document.getElementById('fortune-button').disabled = true;
}

function playAgain() {
    gameTurns = 0;
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('fortune-button').disabled = false;
    document.getElementById('event-message').innerHTML = '';
    initCharacterSelection();
    document.getElementById('character-selection').style.display = 'block';
    document.getElementById('status-display').style.display = 'none';
}

document.getElementById('fortune-button').addEventListener('click', () => {
    if (gameTurns < maxTurns) {
        gameTurns++;
        const diceValue = rollDice();
        calculateNewStatus(playerCharacter, diceValue);
        triggerRandomEvent(playerCharacter);
        bots.forEach(bot => {
            const botDiceValue = rollDice();
            calculateNewStatus(bot, botDiceValue);
            triggerRandomEvent(bot);
        });
        updateStatusDisplay();
        if (gameTurns === maxTurns) {
            displayScores();
            endGame();
        }
    }
});

initCharacterSelection();