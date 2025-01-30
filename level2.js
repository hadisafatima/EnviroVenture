let scene, camera, renderer, light, player;
const playerSpeed = 1;
const keys = {};
const objects = [];
const objectLabels = [
    "Aluminum Can", "Cigarette butts", "Used tissue paper", "Plastic bags", "Paper", 
    "Shredded newspaper", "Fruit Peels", "Broken mirror", "Rubber Ball", "Broken Tile"
];

// Initialize Scene
function init() {
    scene = new THREE.Scene();

    // Camera Setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 20, 100);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("three-canvas") });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // Lighting
    light = new THREE.AmbientLight(0xaaaaaa);
    scene.add(light);

    // Sky
    scene.background = new THREE.Color(0x87CEFA);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(600, 600);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x696969 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Buildings
    for (let i = 0; i < 100; i++) {
        const building = createBuilding();
        building.position.set(
            Math.random() * 400 - 100,
            building.geometry.parameters.height / 2,
            Math.random() * 400 - 100
        );
        scene.add(building);
    }

    // Create Player
    player = createPlayer();
    scene.add(player);

    // Create Objects
    createObjects();

    // Event Listeners for Movement
    window.addEventListener('keydown', (event) => keys[event.key] = true);
    window.addEventListener('keyup', (event) => keys[event.key] = false);

    window.addEventListener('resize', onWindowResize);
    animate();
}

// Create a Random Building
function createBuilding() {
    const width = Math.random() * 3 + 5;
    const height = Math.random() * 20 + 20;
    const depth = Math.random() * 10 + 5;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
    return new THREE.Mesh(geometry, material);
}

// Create the Player (Light Blue Sphere)
function createPlayer() {
    const geometry = new THREE.SphereGeometry(4, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x87CEEB });
    const playerMesh = new THREE.Mesh(geometry, material);
    playerMesh.position.set(0, 5, 0);
    return playerMesh;
}

// Create Dark Colored Objects
function createObjects() {
    for (let i = 0; i < 10; i++) {
        const geometry = new THREE.BoxGeometry(3, 3, 3);
        const material = new THREE.MeshStandardMaterial({ color: 0x333333 }); // Dark color
        const object = new THREE.Mesh(geometry, material);
        object.position.set(
            Math.random() * 200 - 100,
            1.5,
            Math.random() * 200 - 100
        );
        object.label = objectLabels[i]; // Assigning name
        objects.push(object);
        scene.add(object);
    }
}

// Move Player Based on Key Presses
function updatePlayerMovement() {
    if (keys["ArrowUp"]) player.position.z -= playerSpeed;
    if (keys["ArrowDown"]) player.position.z += playerSpeed;
    if (keys["ArrowLeft"]) player.position.x -= playerSpeed;
    if (keys["ArrowRight"]) player.position.x += playerSpeed;

    // Make the camera follow the player
    camera.position.set(player.position.x, 20, player.position.z + 50);
    camera.lookAt(player.position);

    checkNearbyObjects();
}

// Check if Player is Near an Object
function checkNearbyObjects() {
    objects.forEach((object, index) => {
        const distance = player.position.distanceTo(object.position);
        if (distance < 5) {
            showSelectionBox(object, index);
        }
    });
}

function showSelectionBox(object, index) {
    const selectionBox = document.getElementById("selection-box");
    const selectionText = document.getElementById("selection-text");

    selectionText.innerText = `You found: ${object.label}\nWhere do you want to place it? (Recyclable, Non-Recyclable, Compostable)`;
    selectionBox.style.display = "block";

    // Store object index for later use
    selectionBox.dataset.objectIndex = index;
}

let collectedObjects = 0;
const totalObjects = 10; // Set the goal for the number of objects

// Function to update the progress bar
function updateProgress2() {
    // Calculate the percentage based on objects collected
    const percentage = (collectedObjects / totalObjects) * 100;

    // Update the progress bar width
    const progressBar2 = document.getElementById('progressBar2');
    progressBar2.style.width = `${percentage}%`;

    // Change the progress bar color based on the percentage
    if (percentage <= 33) {
        progressBar2.style.backgroundColor = 'rgb(239, 68, 68)'; // Red
    } else if (percentage <= 66) {
        progressBar2.style.backgroundColor = 'rgb(234, 179, 8)'; // Yellow
    } else {
        progressBar2.style.backgroundColor = 'rgb(43, 197, 94)'; // Green
    }

    if (percentage == 100){
        cmplt2.style.display = "flex";
    }
}

// Update level2Coins based on collected objects
const level2Coins = document.getElementById("coinsBar2");

cmplt2 = document.getElementById("congos2");
fact2 = document.getElementById("level2fact");
quiz2 = document.getElementById("level2quiz");
quiz2won = document.getElementById("quiz2cong");
quiz2lostmsg = document.getElementById("quiz2boo");

function level_2_fact() {
    sessionStorage.setItem("Level2Finished", "true"); // Store as string
    sessionStorage.setItem("TwoLevel", "true"); // Store as string
    sessionStorage.setItem("level2coins", level2Coins.textContent);
    cmplt2.style.display = "none";
    fact2.style.display = "flex";
}

function level_2_quiz(){
    fact2.style.display = "none";
    quiz2.style.display = "flex" ;
}

function level_2_quiz_won(){
    sessionStorage.setItem("TwoQuiz", true)
    quiz2.style.display = "none";
    quiz2won.style.display = "flex" ;
    setTimeout(function() {
        window.location.href = 'levels.html'; // Redirect after 2 seconds
    }, 1500);  
}

function level_2_quiz_lost(){
    quiz2.style.display = "none" ;
    quiz2lostmsg.style.display = "flex" ;
    setTimeout(function() {
        window.location.href = 'levels.html'; // Redirect after 2 seconds
    }, 3000); 
}



// Function to update coins and check for progress
function updateLevel2Coins() {
    level2Coins.textContent = parseInt(level2Coins.textContent) + 1;
}

// Function for handling the selection submission
function submitChoice() {
    collectedObjects += 1; // Update collected count
    const choiceInput = document.getElementById("choice-input").value.toLowerCase();
    const selectionBox = document.getElementById("selection-box");
    const objectIndex = parseInt(selectionBox.dataset.objectIndex);

    if (objectIndex >= 0) {
        const object = objects[objectIndex];
        let listId;

        // Check for the correct category
        let correctCategory = false;
        if (choiceInput === "recyclable") {
            listId = "recyclable-list";
            correctCategory = (object.label === "Aluminum Can" || object.label === "Plastic bags" || object.label === "Paper");
        } else if (choiceInput === "non-recyclable") {
            listId = "non-recyclable-list";
            correctCategory = (object.label === "Cigarette butts" || object.label === "Used tissue paper" || object.label === "Broken mirror");
        } else if (choiceInput === "compostable") {
            listId = "compostable-list";
            correctCategory = (object.label === "Fruit Peels" || object.label === "Shredded newspaper" || object.label === "Rubber Ball");
        } else {
            alert("Invalid choice! Enter: Recyclable, Non-Recyclable, or Compostable.");
            return;
        }

        // Add object to the respective bin
        const listItem = document.createElement("li");
        listItem.innerText = object.label + (correctCategory ? " (Correct)" : " (Wrong)");
        document.getElementById(listId).appendChild(listItem);

        // Remove object from the scene
        scene.remove(object);
        objects.splice(objectIndex, 1);

        // Hide selection box
        selectionBox.style.display = "none";
        updateProgress2();
        // Update coins and progress bar
        if (correctCategory) {
            updateLevel2Coins();
        }
    }
}


// Display Object Name as Prompt
function displayMessage(text) {
    const messageBox = document.getElementById("message-box");
    messageBox.innerText = "You found: " + text;
    messageBox.style.display = "block";
    setTimeout(() => { messageBox.style.display = "none"; }, 2000);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    updatePlayerMovement();
    renderer.render(scene, camera);
}

// Handle Window Resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();