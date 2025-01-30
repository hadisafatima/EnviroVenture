function startGame() {
    document.getElementById("titlePage").classList.add("hidden");
    document.getElementById("levelsPage").classList.remove("hidden");
}

// Function to go to level 1 page
function goToLevel1Page() {
    document.getElementById("levelsPage").classList.add("hidden");
    document.getElementById("level1Page").classList.remove("hidden");
}

// Function to exit from the level 1 page and go back to the levels page
function exitLevel1Page() {
    document.getElementById("level1Page").classList.add("hidden");
    document.getElementById("levelsPage").classList.remove("hidden");
}

// Function to exit the game (back to title page)
function exitGame() {
    document.getElementById("levelsPage").classList.add("hidden");
    document.getElementById("titlePage").classList.remove("hidden");
}

let coins = 0;

const coinsBar = document.getElementById("coinsBar");
function updateCoins(newCoins) {
    if (coinsBar.textContent < 10){
        coins = newCoins;
        coinsBar.textContent = coins;
    }
    if (newCoins == 20){
        coins = newCoins;
        coinsBar.textContent = coins;
    }
}


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});