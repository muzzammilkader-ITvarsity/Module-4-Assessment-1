const container = document.getElementById('funny-container');
const shuffleBtn = document.getElementById('shuffle-btn');
const stickman = "stickman.png"; // Your local stickman image

// Your local funny people images
const funnyPeople = [
  "funny1.jpg",
  "funny2.jpg",
  "funny3.jpg",
  "funny4.jpg"
];

// Function to create a card
function addFunnyCard(imageSrc) {
  const card = document.createElement('div');
  card.classList.add('funny-card');

  const leftDiv = document.createElement('div');
  leftDiv.classList.add('image-left');
  const leftImg = document.createElement('img');
  leftImg.src = imageSrc;
  leftImg.alt = "Funny Person";
  leftDiv.appendChild(leftImg);

  const rightDiv = document.createElement('div');
  rightDiv.classList.add('stickman-right');
  const rightImg = document.createElement('img');
  rightImg.src = stickman;
  rightImg.alt = "Stickman";
  rightDiv.appendChild(rightImg);

  card.appendChild(leftDiv);
  card.appendChild(rightDiv);

  container.appendChild(card);
}

// Display all funny people initially
function displayAllFunnyPeople() {
  container.innerHTML = '';
  funnyPeople.forEach(person => addFunnyCard(person));
}

// Shuffle function: randomly reorder all cards
function shuffleFunnyPeople() {
  const shuffled = [...funnyPeople].sort(() => Math.random() - 0.5);
  container.innerHTML = '';
  shuffled.forEach(person => addFunnyCard(person));
}

// Initial display
displayAllFunnyPeople();

// Button click
shuffleBtn.addEventListener('click', shuffleFunnyPeople);
