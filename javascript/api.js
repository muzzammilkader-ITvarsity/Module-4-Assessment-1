const leftImages = document.querySelectorAll("#left-column img");
const rightColumn = document.getElementById("right-column");

leftImages.forEach(img => {
  img.addEventListener("mousedown", e => {
    e.preventDefault();

    // Create a clone of the dragged image
    const dragImg = img.cloneNode(true);
    dragImg.className = "added";
    dragImg.style.position = "absolute";
    dragImg.style.pointerEvents = "none"; // ignore mouse events during drag
    rightColumn.appendChild(dragImg);

    const rect = rightColumn.getBoundingClientRect();
    const offsetX = e.offsetX;
    const offsetY = e.offsetY;

    // Move the clone with the mouse
    function onMouseMove(event) {
      dragImg.style.left = (event.clientX - rect.left - offsetX) + "px";
      dragImg.style.top = (event.clientY - rect.top - offsetY) + "px";
    }

    document.addEventListener("mousemove", onMouseMove);

    // On mouse up, drop the image
    function onMouseUp() {
      dragImg.style.pointerEvents = "auto"; // allow clicking to remove
      dragImg.addEventListener("click", () => dragImg.remove());

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mouseup", onMouseUp);
  });
});
