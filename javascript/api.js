// Select all draggable images
const draggables = document.querySelectorAll('.draggable');
const rightColumn = document.getElementById('right-column');
const resetBtn = document.getElementById('resetBtn');

// Drag start: store image source
draggables.forEach(img => {
    img.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', e.target.src);
    });
});

// Allow dropping on the right column
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

    // Position based on drop location
    const rect = rightColumn.getBoundingClientRect();
    newImg.style.left = `${e.clientX - rect.left - 40}px`;
    newImg.style.top = `${e.clientY - rect.top - 40}px`;
    newImg.style.width = '80px';
    newImg.style.height = '80px';

    rightColumn.appendChild(newImg);

    // Remove item on click
    newImg.addEventListener('click', () => newImg.remove());
});

// Reset button clears all added items
resetBtn.addEventListener('click', () => {
    document.querySelectorAll('#right-column img.added').forEach(item => item.remove());
});
