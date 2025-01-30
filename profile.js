if (sessionStorage.getItem("Level1Finished")){
  numTrees = 10;
}else{
  numTrees = 0;
}

lockedLevel2 = document.getElementById("level_2");
unlockedLevel2 = document.getElementById("activeLevel2") ;
function level2Unlocked(){
  lockedLevel2.classList.add("hidden");

  unlockedLevel2.classList.remove("hidden");
}


lockedLevel3 = document.getElementById("level_3");
unlockedLevel3 = document.getElementById("activeLevel3");
function level3Unlocked(){
  lockedLevel3.classList.add("hidden");

  unlockedLevel3.classList.remove("hidden");
}


if (sessionStorage.getItem("OneLevel")){
  levelsFinished = 1
  level2Unlocked();
  if (sessionStorage.getItem("TwoLevel")){
    levelsFinished = 2 ;
    level3Unlocked();
  }
}else{
  levelsFinished = 0
}

if (sessionStorage.getItem("OneQuiz")){
  quizzesFinished = 1;
}else{
  quizzesFinished = 0
}

function reflectLevel2Coins(){
  return parseInt(sessionStorage.getItem("level2coins"));
}


if (numTrees === 10 && quizzesFinished === 1){
  coins = 20 ;
  if (sessionStorage.getItem("Level2Finished")){
    coins += reflectLevel2Coins();
  }
} else if (numTrees == 10 && quizzesFinished === 0){
  coins = 10 ;
  if (sessionStorage.getItem("Level2Finished")){
    coins += reflectLevel2Coins();
  }
} else if (numTrees === 0){
  coins = 0;
  if (sessionStorage.getItem("Level2Finished")){
    coins += reflectLevel2Coins();
  }
}

if (sessionStorage.getItem("TwoQuiz")){
  quizzesFinished = 2 ;
}

playerProfile = {
  playerName: "Player1",
  coinsEarned : coins,
  avatarURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP9EcLK3EW4zjYy6bRODorV4QkhI62QA8s1A&s",
  stats: {
    plantedTrees: numTrees,
    co2Offset: 0,
    wasteRecycled: 0,
    levelsCompleted: levelsFinished,
    quizzesCompleted: quizzesFinished,
  },
};

// DOM Elements
const playerNameEl = document.getElementById("player-name");
const avatarImgEl = document.getElementById("avatar-img");
const uploadAvatarEl = document.getElementById("upload-avatar");
const treesPlantedEl = document.getElementById("trees-planted");
const co2OffsetEl = document.getElementById("co2-offset");
const wasteRecycledEl = document.getElementById("waste-recycled");
const levelsCompletedEl = document.getElementById("levels-completed");
const quizzesCompletedEl = document.getElementById("quizzes-completed");
const achievementsListEl = document.getElementById("achievements-list");
const totalCoinsE1 = document.getElementById("total_coins");

// Load profile data into the DOM
function loadProfileData() {
  // Retrieve stored player name and avatar from sessionStorage
  const storedName = sessionStorage.getItem("playerName");
  const storedAvatar = sessionStorage.getItem("playerAvatar");

  // If stored name exists, use it; otherwise, use default
  playerProfile.playerName = storedName || "Player1";
  playerProfile.avatarURL = storedAvatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP9EcLK3EW4zjYy6bRODorV4QkhI62QA8s1A&s";

  // Update DOM elements
  playerNameEl.textContent = playerProfile.playerName;
  avatarImgEl.src = playerProfile.avatarURL;

  // Update stats
  treesPlantedEl.textContent = playerProfile.stats.plantedTrees;
  co2OffsetEl.textContent = playerProfile.stats.co2Offset;
  wasteRecycledEl.textContent = playerProfile.stats.wasteRecycled;
  levelsCompletedEl.textContent = playerProfile.stats.levelsCompleted;
  quizzesCompletedEl.textContent = playerProfile.stats.quizzesCompleted;
  totalCoinsE1.textContent = playerProfile.coinsEarned;
}

// Change player name and save it
playerNameEl.addEventListener("click", () => {
  const newName = prompt("Enter your new player name:");
  if (newName) {
    playerProfile.playerName = newName;
    playerNameEl.textContent = newName;
    sessionStorage.setItem("playerName", newName); // Store name in sessionStorage
  }
});

// Change avatar image and save it
uploadAvatarEl.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      playerProfile.avatarURL = e.target.result;
      avatarImgEl.src = e.target.result;
      sessionStorage.setItem("playerAvatar", e.target.result); // Store image in sessionStorage
    };
    reader.readAsDataURL(file);
  }
});

// Load profile data on page load
window.onload = loadProfileData;


function profileSideBar() {
  const sidebar = document.getElementById("pfSideBar");
  sidebar.classList.remove("animate-slide-out-to-right"); // Remove exit animation
  sidebar.classList.add("animate-slide-in-from-right");  // Add entry animation
}

function removeProfileSideBar() {
  const sidebar = document.getElementById("pfSideBar");
  sidebar.classList.remove("animate-slide-in-from-right"); // Remove entry animation
  sidebar.classList.add("animate-slide-out-to-right");    // Add exit animation
}