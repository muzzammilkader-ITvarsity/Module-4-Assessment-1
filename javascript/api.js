const draggables = document.querySelectorAll('.draggable');
const rightColumn = document.getElementById('right-column');
const stickman = document.getElementById('stickman');
const resetBtn = document.getElementById('resetBtn');

// Snap positions for each item type (adjust numbers if needed)
const snapPositions = {
    eyes_01: {top: 70, left: 120, width: 80},
    eyes_02: {top: 70, left: 120, width: 80},
    eyes_03: {top: 70, left: 120, width: 80},
    eyes_04: {top: 70, left: 120, width: 80},
    eyes_05: {top: 70, left: 120, width: 80},
    eyes_06: {top: 70, left: 120, width: 80},
    eyes_07: {top: 70, left: 120, width: 80},
    eyes_08: {top: 70, left: 120, width: 80},

    face_hair_01: {top: 140, left: 120, width: 80},
    face_hair_02: {top: 140, left: 120, width: 80},
    face_hair_03: {top: 140, left: 120, width: 80},
    face_hair_04: {top: 140, left: 120, width: 80},
    face_hair_05: {top: 140, left: 120, width: 80},

    hair_01: {top: 20, left: 120, width: 120},
    hair_02: {top: 20, left: 120, width: 120},
    hair_03: {top: 20, left: 120, width: 120},
    hair_04: {top: 20, left: 120, width: 120},
    hair_05: {top: 20, left: 120, width: 120},
    hair_06: {top: 20, left: 120, width: 120},
    hair_07: {top: 20, left: 120, width: 120},

    glasses_01: {top: 70, left: 120, width: 80},
    glasses_02: {top: 70, left: 120, width: 80},
    glasses_03: {top: 70, left: 120, width: 80},
    glasses_04: {top: 70, left: 120, width: 80},
    glasses_05: {top: 70, left: 120, width: 80},

    hat_01: {top: 0, left: 120, width: 120},
    hat_02: {top: 0, left: 120, width: 120},
    hat_03: {top: 0, left: 120, width: 120},
    hat_04: {top: 0, left: 120, width: 120},
    hat_05: {top: 0, left: 120, width: 120},

    mouth_01: {top: 150, left: 120, width: 80},
    mouth_02: {top: 150, left: 120, width: 80},
    mouth_03: {top: 150, left: 120, width: 80},
    mouth_04: {top: 150, left: 120, width: 80},
    mouth_05: {top: 150, left: 120, width: 80},
    mouth_06: {top: 150, left: 120, width: 80},
    mouth_07: {top: 150, left: 120, width: 80},
    mouth_08: {top: 150, left: 120, width: 80},

    shirt_01: {top: 200, left: 110, width: 120},
    shirt_02: {top: 200, left: 110, width: 120},
    shirt_03: {top: 200, left: 110, width: 120},
    shirt_04: {top: 200, left: 110, width: 120},
    shirt_05: {top: 200, left: 110, width: 120},

    pants_01: {top: 300, left: 110, width: 120},
    pants_02: {top: 300, left: 110, width: 120},
    pants_03: {top: 300, left: 110, width: 120},
    pants_04: {top: 300, left: 110, width: 120},
    pants_05: {top: 300, left: 110, width: 120},

    shoe_01_L: {top: 400, left: 110, width: 50},
    shoe_01_R: {top: 400, left: 180, width: 50},
    shoe_02_L: {top: 400, left: 110, width: 50},
    shoe_02_R: {top: 400, left: 180, width: 50}
};

// Drag start
draggables.forEach(img => {
    img.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', e.target.src);
    });
});

// Drop
rightColumn.addEventListener('dragover', e => e.preventDefault());

rightColumn.addEventListener('drop', e => {
    e.preventDefault();
    const src = e.dataTransfer.getData('text/plain');
    const filename = src.split('/').pop().split('.')[0]; // get file name without extension

    const newImg = document.createElement('img');
    newImg.src = src;
    newImg.classList.add('added');

    if(snapPositions[filename]){
        const pos = snapPositions[filename];
        newImg.style.position = 'absolute';
        newImg.style.top = `${pos.top}px`;
        newImg.style.left = `${pos.left}px`;
        newImg.style.width = `${pos.width}px`;
    } else {
        // unknown items drop where mouse is
        const rect = rightColumn.getBoundingClientRect();
        newImg.style.position = 'absolute';
        newImg.style.left = `${e.clientX - rect.left - 40}px`;
        newImg.style.top = `${e.clientY - rect.top - 40}px`;
        newImg.style.width = '80px';
        newImg.style.height = '80px';
    }

    rightColumn.appendChild(newImg);

    // Click to remove
    newImg.addEventListener('click', () => newImg.remove());
});

// Reset button
resetBtn.addEventListener('click', () => {
    document.querySelectorAll('#right-column img.added').forEach(item => item.remove());
});
