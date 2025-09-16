const leftImages = document.querySelectorAll("#left-column img");
const rightColumn = document.getElementById("right-column");

leftImages.forEach(img => {
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
