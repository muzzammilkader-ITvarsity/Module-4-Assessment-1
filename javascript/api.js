const leftImages = document.querySelectorAll("#left-column img");
const rightColumn = document.getElementById("right-column");

leftImages.forEach(img => {
  img.addEventListener("mousedown", e => {
    e.preventDefault();

    // Clone the dragged image
    const dragImg = img.cloneNode(true);
    dragImg.classList.add("added");

    // Add type class based on filename for proper sizing
    const src = img.src.toLowerCase();
    if (src.includes("eyes")) dragImg.classList.add("eyes");
    else if (src.includes("hair")) dragImg.classList.add("hair");
    else if (src.includes("hat")) dragImg.classList.add("hat");
    else if (src.includes("mouth")) dragImg.classList.add("mouth");
    else if (src.includes("shirt")) dragImg.classList.add("shirt");
    else if (src.includes("pants")) dragImg.classList.add("pants");
    else if (src.includes("shoe")) dragImg.classList.add("shoes");

    dragImg.style.position = "absolute";
    dragImg.style.pointerEvents = "none"; // ignore mouse events while dragging
    rightColumn.appendChild(dragImg);

    const rect = rightColumn.getBoundingClientRect();

    // Move the clone with the mouse
    function onMouseMove(event) {
      const x = event.clientX - rect.left - dragImg.width / 2;
      const y = event.clientY - rect.top - dragImg.height / 2;
      dragImg.style.left = x + "px";
      dragImg.style.top = y + "px";
    }

    document.addEventListener("mousemove", onMouseMove);

    // Drop the image
    function onMouseUp() {
      dragImg.style.pointerEvents = "auto"; // enable click to remove
      dragImg.addEventListener("click", () => dragImg.remove());

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mouseup", onMouseUp);
  });
});
