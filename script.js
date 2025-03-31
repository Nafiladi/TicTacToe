const characters = {
    NHLin: { health: 70, energy: 80, oxygen: 100, description: "Weak, Fast... Like a chicken in Ohio!" },
    BSK: { health: 90, energy: 80, oxygen: 100, description: "Strong, Quick... Like a squirrel in Ohio!" },
    Darren: { health: 70, energy: 90, oxygen: 100, description: "Quick, Strong... Probably invented sliced bread!" },
    Hao: { health: 80, energy: 80, oxygen: 100, description: "Strong, Black... He once won a staring contest with a mirror!" },
    Steve: { health: 90, energy: 85, oxygen: 100, description: "Calm, Analytical... Can even calm a raging coffee machine!" },
    Jaden: { health: 80, energy: 120, oxygen: 100, description: "Fast, Engaging... Always has a swim at the ready!" },
    Albert: { health: 165, energy: 55, oxygen: 100, description: "slow, Focused... He's chasing his dreams, one NHLin at a time!" },
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
    CHZ: { health: 80, energy: 40, oxygen: 100, description: "Mysterious, Intriguing... Might be a part-time superhero!" },
};


let playerCharacter = null;
let bots = [];
let gameTurns = 0;
const maxTurns = 10;


function initCharacterSelection() {
    const characterSelection = document.getElementById('character-selection');
    characterSelection.innerHTML = `<h2>Select Your Character</h2>`;
    for (const name in characters) {
        characterSelection.innerHTML += `<button class="game-button" onclick="selectCharacter('${name}')">${name}</button>`;
    }
}


function selectCharacter(name) {
    playerCharacter = { name, ...characters[name] }; 
    alert(`You selected ${name}!`);
    

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

// Render Status Bars
function renderBars(character) {
    return `
        <div class="bar health" style="--health-percent: ${character.health}%;"><strong>${character.health} HP</strong></div>
        <div class="bar energy" style="--energy-percent: ${character.energy}%;"><strong>${character.energy} EN</strong></div>
        <div class="bar oxygen" style="--oxygen-percent: ${character.oxygen}%;"><strong>${character.oxygen} O2</strong></div>
    `;
}


function updateStatusDisplay() {
    const statusDisplay = document.getElementById('status-display');
    statusDisplay.innerHTML = `<div class="character-card"><strong>Your Character:</strong><br>${playerCharacter.name}<br>${playerCharacter.description}<br>${renderBars(playerCharacter)}<br><button onclick="activateAbility(playerCharacter)">Activate Ability</button></div>`;
    
    for (const bot of bots) {
        statusDisplay.innerHTML += `<div class="character-card"><strong>${bot.name} (character):</strong><br>${bot.description}<br>${renderBars(bot)}</div>`;
    }
}


function activateAbility(character) {
    const abilityEffect = character.ability();
    character.oxygen += abilityEffect.oxygenBoost;
    character.energy += abilityEffect.energyBoost;
    alert(`${character.name} activated their special ability! Energy +${abilityEffect.energyBoost}, Oxygen +${abilityEffect.oxygenBoost}.`);
}


function triggerRandomEvent(character) {
    const events = [
        "A sudden wind boosts your energy! +10 Energy",
        "You found an oxygen tank! +15 Oxygen",
        "A mischievous creature steals your energy! -10 Energy",
        "You accidentally inhale too much confetti! -5 Oxygen"
    ];
    
    const eventIndex = Math.floor(Math.random() * events.length);
    
    if (eventIndex === 0) {
        character.energy += 10;
    } else if (eventIndex === 1) {
        character.oxygen += 15;
    } else if (eventIndex === 2) {
        character.energy = Math.max(0, character.energy - 10);
    } else {
        character.oxygen = Math.max(0, character.oxygen - 5);
    }

    alert(events[eventIndex]);
}


function calculateScore(character) {
    return character.health + character.energy + character.oxygen;
}


function displayScores() {
    const playerScore = calculateScore(playerCharacter);
    const botScores = bots.map(bot => calculateScore(bot));
    alert(`Your total score is: ${playerScore}. Bots' scores are: ${botScores.map((score, index) => `Bot${index + 1}: ${score}`).join(', ')}`);
}


function endGame() {
    const playerScore = calculateScore(playerCharacter);
    const botScores = bots.map(bot => calculateScore(bot));
    const highestScore = Math.max(playerScore, ...botScores);
    const winner = playerScore === highestScore ? `You` : `Bot ${botScores.indexOf(highestScore) + 1}`;

    const gameOverDiv = document.getElementById('game-over');
    gameOverDiv.innerHTML = `<h2>Game Over!</h2><p>The winner is: ${winner} with a score of ${highestScore}!</p>`;
    gameOverDiv.style.display = 'block';
    document.getElementById('fortune-button').disabled = true;
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
