// Select all draggable images
const draggables = document.querySelectorAll('.draggable');
const rightColumn = document.getElementById('right-column');
const stickman = document.getElementById('stickman');
const resetBtn = document.getElementById('resetBtn');

// Drag start: store image source
draggables.forEach(img => {
    img.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', e.target.src);
    });
});

// Allow dropping on the right column (stickman area)
rightColumn.addEventListener('dragover', e => {
    e.preventDefault();
});

// Drop event
rightColumn.addEventListener('drop', e => {
    e.preventDefault();
    const src = e.dataTransfer.getData('text/plain');

    // Create a new image
    const newImg = document.createElement('img');
    newImg.src = src;
    newImg.classList.add('added');
    
    // Set initial position based on drop location
    const rect = rightColumn.getBoundingClientRect();
    newImg.style.left = `${e.clientX - rect.left - 40}px`; // center image
    newImg.style.top = `${e.clientY - rect.top - 40}px`;   
    newImg.style.width = '80px';
    newImg.style.height = '80px';
    
    rightColumn.appendChild(newImg);

    // Click on added item to remove it
    newImg.addEventListener('click', () => {
        newImg.remove();
    });
});

// Reset button functionality
resetBtn.addEventListener('click', () => {
    const addedItems = document.querySelectorAll('#right-column img.added');
    addedItems.forEach(item => item.remove());
});
