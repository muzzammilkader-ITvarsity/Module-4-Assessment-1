const leftImages = document.querySelectorAll("#left-column img");
const rightColumn = document.getElementById("right-column");

// Remove old stickmen
const oldStickman = rightColumn.querySelectorAll("img");
oldStickman.forEach(img => img.remove());

// Add new stickman
const stickman = document.createElement("img");
stickman.src = "new_stickman.png"; 
stickman.id = "stickman";
stickman.style.height = "400px"; // same as before
stickman.style.position = "absolute";
stickman.style.left = "50%";
stickman.style.top = "50%";
stickman.style.transform = "translate(-50%, -50%)";
rightColumn.appendChild(stickman);

// Add new images to the left column
const leftColumn = document.getElementById("left-column");
const newImages = ["cartoon_hat.png", "blue_cap.png", "pants.png", "shirt.png", "t_shirt.png"];
newImages.forEach(src => {
  const img = document.createElement("img");
  img.src = src;
  leftColumn.appendChild(img);
});

// Add drag functionality to all left-column images
const updatedLeftImages = document.querySelectorAll("#left-column img");
updatedLeftImages.forEach(img => {
  img.addEventListener("mousedown", e => {
    e.preventDefault();

    // Create a clone of the image for dragging
    const dragImg = document.createElement("img");
    dragImg.src = img.src;
    dragImg.className = "added";
    dragImg.style.position = "absolute";
    dragImg.style.pointerEvents = "none"; // so we don't capture mouse events
    rightColumn.appendChild(dragImg);

    // Position it under the cursor
    const rect = rightColumn.getBoundingClientRect();
    dragImg.style.left = (e.clientX - rect.left - dragImg.width / 2) + "px";
    dragImg.style.top = (e.clientY - rect.top - dragImg.height / 2) + "px";

    // Move with mouse
    function moveHandler(ev) {
      dragImg.style.left = (ev.clientX - rect.left - dragImg.width / 2) + "px";
      dragImg.style.top = (ev.clientY - rect.top - dragImg.height / 2) + "px";
    }

    function upHandler() {
      dragImg.style.pointerEvents = "auto"; // allow clicking to remove
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);

      // Click to remove
      dragImg.addEventListener("click", () => dragImg.remove());
    }

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
  });
});
