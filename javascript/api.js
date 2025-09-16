// Make left-column images draggable
document.querySelectorAll("#left-column img").forEach(img => {
  img.setAttribute("draggable", "true");

  img.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", e.target.src);
  });
});

const rightColumn = document.getElementById("right-column");

// Highlight drop area on dragover
rightColumn.addEventListener("dragover", e => {
  e.preventDefault(); // must prevent default
  rightColumn.style.border = "2px dashed red";
});

rightColumn.addEventListener("dragleave", () => {
  rightColumn.style.border = "2px dashed transparent";
});

// Handle drop
rightColumn.addEventListener("drop", e => {
  e.preventDefault();
  rightColumn.style.border = "2px dashed transparent";

  const src = e.dataTransfer.getData("text/plain");
  if (!src) return;

  const newImg = document.createElement("img");
  newImg.src = src;
  newImg.className = "added";
  newImg.style.position = "absolute";

  // Wait for the image to load before calculating size
  newImg.onload = () => {
    const rect = rightColumn.getBoundingClientRect();
    const imgWidth = newImg.width;
    const imgHeight = newImg.height;

    // Center image exactly at cursor
    newImg.style.left = (e.clientX - rect.left - imgWidth / 2) + "px";
    newImg.style.top = (e.clientY - rect.top - imgHeight / 2) + "px";
  };

  // Click to remove
  newImg.addEventListener("click", () => newImg.remove());

  rightColumn.appendChild(newImg);
});
