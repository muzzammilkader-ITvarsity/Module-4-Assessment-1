const leftImages = document.querySelectorAll("#left-column img");
const rightColumn = document.getElementById("right-column");

// Predefined snap positions for each accessory type (x, y relative to right column)
const snapPositions = {
  eyes:   { x: 270, y: 180 },
  hair:   { x: 250, y: 100 },
  hat:    { x: 250, y: 50 },
  mouth:  { x: 270, y: 250 },
  shirt:  { x: 250, y: 300 },
  pants:  { x: 250, y: 400 },
  shoes:  { x: 250, y: 500 }
};

leftImages.forEach(img => {
  img.addEventListener("mousedown", e => {
    e.preventDefault();

    // Clone the dragged image
    const dragImg = img.cloneNode(true);
    dragImg.classList.add("added");

    // Determine type based on filename
    const src = img.src.toLowerCase();
    let type = "";
    if (src.includes("eyes")) type = "eyes";
    else if (src.includes("hair")) type = "hair";
    else if (src.includes("hat")) type = "hat";
    else if (src.includes("mouth")) type = "mouth";
    else if (src.includes("shirt")) type = "shirt";
    else if (src.includes("pants")) type = "pants";
    else if (src.includes("shoe")) type = "shoes";

    if (type) dragImg.classList.add(type);

    dragImg.style.position = "absolute";
    dragImg.style.pointerEvents = "none"; 
    rightColumn.appendChild(dragImg);

    const rect = rightColumn.getBoundingClientRect();

    // Move image with mouse
    function onMouseMove(event) {
      const x = event.clientX - rect.left - dragImg.width / 2;
      const y = event.clientY - rect.top - dragImg.height / 2;
      dragImg.style.left = x + "px";
      dragImg.style.top = y + "px";
    }

    document.addEventListener("mousemove", onMouseMove);

    // Drop image
    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      dragImg.style.pointerEvents = "auto"; // allow click-to-remove
      dragImg.addEventListener("click", () => dragImg.remove());

      // Snap to predefined position if type exists
      if (type && snapPositions[type]) {
        const snap = snapPositions[type];
        dragImg.style.left = snap.x + "px";
        dragImg.style.top = snap.y + "px";
      }
    }

    document.addEventListener("mouseup", onMouseUp);
  });
});
