const container = document.getElementById('funny-container');
const shuffleBtn = document.getElementById('shuffle-btn');
const stickman = "stickman.png"; // Stickman image

// Example: Fetch funny people from API
async function fetchFunnyPeople() {
  try {
    const response = await fetch('https://your-api-url.com/funny-people');
    const data = await response.json(); // Assume API returns array of image URLs
    return data;
  } catch (error) {
    console.error('Error fetching funny people:', error);
    return [];
  }
}

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

// Shuffle function
async function shuffleFunnyPeople() {
  container.innerHTML = ''; // Clear previous cards
  const people = await fetchFunnyPeople();
  if (people.length === 0) return;

  // Pick random person
  const randomIndex = Math.floor(Math.random() * people.length);
  addFunnyCard(people[randomIndex]);
}

// Initial load
shuffleFunnyPeople();

// Button click
shuffleBtn.addEventListener('click', shuffleFunnyPeople);
