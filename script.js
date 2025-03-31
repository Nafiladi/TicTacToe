const characters = {
    NHLin: {
        health: 70,
        energy: 80,
        oxygen: 100,
        description: "Weak, Fast... Like a chicken in Ohio!",
        ability: activateNHLinAbility
    },
    BSK: {
        health: 90,
        energy: 80,
        oxygen: 100,
        description: "Strong, Quick... Like a squirrel in Ohio!",
        ability: activateBSKAbility
    },
    Darren: {
        health: 70,
        energy: 90,
        oxygen: 100,
        description: "Quick, Strong... Probably invented sliced bread!",
        ability: activateDarrenAbility
    },
    Hao: {
        health: 80,
        energy: 80,
        oxygen: 100,
        description: "Strong, Black... He once won a staring contest with a mirror!",
        ability: activateHaoAbility
    },
    Steve: {
        health: 90,
        energy: 85,
        oxygen: 100,
        description: "Calm, Analytical... Can even calm a raging coffee machine!",
        ability: activateSteveAbility
    },
    Jaden: {
        health: 80,
        energy: 120,
        oxygen: 100,
        description: "Fast, Engaging... Always has a swim at the ready!",
        ability: activateJadenAbility
    },
    Albert: {
        health: 165,
        energy: 55,
        oxygen: 100,
        description: "Slow, Focused... He's chasing his dreams, one NHLin at a time!",
        ability: activateAlbertAbility
    },
    Noah: {
        health: 80,
        energy: 85,
        oxygen: 100,
        description: "Smart, Slow... Could outsmart a fridge in a power cut!",
        ability: activateNoahAbility
    },
    Galvin: {
        health: 85,
        energy: 80,
        oxygen: 100,
        description: "Fearless, Brave... Once tried to pet a e-giant!",
        ability: activateGalvinAbility
    },
    Nevin: {
        health: 70,
        energy: 70,
        oxygen: 100,
        description: "Slow, Calm... Knows the best Skibidi Watcher!",
        ability: activateNevinAbility
    },
    Jorgina: {
        health: 85,
        energy: 65,
        oxygen: 100,
        description: "Surprising, Quick... She once jump-started a car with two spoons!",
        ability: activateJorginaAbility
    },
    Vivien: {
        health: 90,
        energy: 80,
        oxygen: 100,
        description: "Charming, Witty... Could charm the socks off a statue!",
        ability: activateVivienAbility
    },
    Yanxi: {
        health: 75,
        energy: 75,
        oxygen: 100,
        description: "Resourceful, Clever... Uses moan to fix everything!",
        ability: activateYanxiAbility
    },
    Junteng: {
        health: 85,
        energy: 70,
        oxygen: 100,
        description: "Strong, Brave... Wrestled a bear... and lost with a hug!",
        ability: activateJuntengAbility
    },
    Jeff: {
        health: 145,
        energy: 60,
        oxygen: 100,
        description: "Smart, Analytical... Calculates the best NHLin Gyat!",
        ability: activateJeffAbility
    },
    JeffLai: {
        health: 80,
        energy: 65,
        oxygen: 100,
        description: "Slow, Ambitious... Can order pizza in zero languages!",
        ability: activateJeffLaiAbility
    },
    Ethan: {
        health: 70,
        energy: 75,
        oxygen: 100,
        description: "Quick... Runs like a cheetah... after kfcs!",
        ability: activateEthanAbility
    },
    Aeryn: {
        health: 80,
        energy: 70,
        oxygen: 100,
        description: "Ambitious, Driven... Wants to become a professional ice cream taster!",
        ability: activateAerynAbility
    },
    Javier: {
        health: 90,
        energy: 80,
        oxygen: 100,
        description: "Bold, Adventurous... Took his goldfish to the beach!",
        ability: activateJavierAbility
    },
    Iris: {
        health: 80,
        energy: 70,
        oxygen: 100,
        description: "Wise, Calm... Should probably run a meditation retreat!",
        ability: activateIrisAbility
    },
    Fredrick: {
        health: 70,
        energy: 95,
        oxygen: 100,
        description: "Unique, Energyful... Could sell sand in a desert!",
        ability: activateFredrickAbility
    },
    Eddy: {
        health: 85,
        energy: 120,
        oxygen: 100,
        description: "Fun, Innovative... Can turn any event into a surprise dance party!",
        ability: activateEddyAbility
    },
    CHZ: {
        health: 80,
        energy: 40,
        oxygen: 100,
        description: "Mysterious, Intriguing... Might be a part-time superhero!",
        ability: activateCHZAbility
    },
    // Add more characters here if needed
};

// Ability Functions for Characters
function activateNHLinAbility(character) {
    character.oxygen += 20;
    showModal("NHLin used their ability! +20 Oxygen");
}

function activateBSKAbility(character) {
    character.energy += 15;
    showModal("BSK used their ability! +15 Energy");
}

function activateDarrenAbility(character) {
    character.health += 10; // Heals Darren
    showModal("Darren used their ability! +10 Health");
}

function activateHaoAbility(character) {
    character.oxygen += 15; // Boost oxygen for Hao
    showModal("Hao used their ability! +15 Oxygen");
}

function activateSteveAbility(character) {
    character.energy += 20; // Boost energy for Steve
    showModal("Steve used their ability! +20 Energy");
}

function activateJadenAbility(character) {
    character.health += 5; // Minor heal for Jaden
    showModal("Jaden used their ability! +5 Health");
}

function activateAlbertAbility(character) {
    character.energy += 10; // Healing Albert's energy
    showModal("Albert used their ability! +10 Energy");
}

function activateNoahAbility(character) {
    character.oxygen += 25; // Oxygen boost for Noah
    showModal("Noah used their ability! +25 Oxygen");
}

function activateGalvinAbility(character) {
    character.energy += 10; // Boost Galvin's energy
    showModal("Galvin used their ability! +10 Energy");
}

function activateNevinAbility(character) {
    character.health += 15; // Minor heal for Nevin
    showModal("Nevin used their ability! +15 Health");
}

function activateJorginaAbility(character) {
    character.energy += 10; // Boost energy for Jorgina
    showModal("Jorgina used their ability! +10 Energy");
}

function activateVivienAbility(character) {
    character.oxygen += 10; // Oxygen boost for Vivien
    showModal("Vivien used their ability! +10 Oxygen");
}

function activateYanxiAbility(character) {
    character.energy += 15; // Boost energy for Yanxi
    showModal("Yanxi used their ability! +15 Energy");
}

function activateJuntengAbility(character) {
    character.health += 20; // Heal Junteng
    showModal("Junteng used their ability! +20 Health");
}

function activateJeffAbility(character) {
    character.oxygen += 20; // Boost oxygen for Jeff
    showModal("Jeff used their ability! +20 Oxygen");
}

function activateJeffLaiAbility(character) {
    character.energy += 10; // Boost Jeff Lai's energy
    showModal("JeffLai used their ability! +10 Energy");
}

function activateEthanAbility(character) {
    character.oxygen += 5; // Minor oxygen boost
    showModal("Ethan used their ability! +5 Oxygen");
}

function activateAerynAbility(character) {
    character.health += 10; // Heal Aeryn
    showModal("Aeryn used their ability! +10 Health");
}

function activateJavierAbility(character) {
    character.energy += 15; // Boost energy for Javier
    showModal("Javier used their ability! +15 Energy");
}

function activateIrisAbility(character) {
    character.health += 5; // Minor heal for Iris
    showModal("Iris used their ability! +5 Health");
}

function activateFredrickAbility(character) {
    character.oxygen += 15; // Oxygen boost for Fredrick
    showModal("Fredrick used their ability! +15 Oxygen");
}

function activateEddyAbility(character) {
    character.energy += 20; // Boost energy for Eddy
    showModal("Eddy used their ability! +20 Energy");
}

function activateCHZAbility(character) {
    character.oxygen += 10; // Minor oxygen boost
    showModal("CHZ used their ability! +10 Oxygen");
}