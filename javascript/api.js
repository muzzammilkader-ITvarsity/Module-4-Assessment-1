// Make left-column images draggable
document.querySelectorAll("#left-column img").forEach(img => {
  img.setAttribute("draggable", "true");

  img.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", e.target.src);
  });
});

const rightColumn = document.getElementById("right-column");

// Highlight drop area
rightColumn.addEventListener("dragover", e => {
  e.preventDefault();
  rightColumn.style.border = "2px dashed red";
});

rightColumn.addEventListener("dragleave", () => {
  rightColumn.style.border = "2px dashed transparent";
});

// Drop event - stick exactly where cursor is
rightColumn.addEventListener("drop", e => {
  e.preventDefault();
  rightColumn.style.border = "2px dashed transparent";

  const src = e.dataTransfer.getData("text/plain");
  if (!src) return;

  const newImg = document.createElement("img");
  newImg.src = src;
  newImg.className = "added";

  // Append first to measure size
  newImg.style.position = "absolute";
  newImg.style.left = "0px";
  newImg.style.top = "0px";
  rightColumn.appendChild(newImg);

  // Center the image at cursor
  const rect = rightColumn.getBoundingClientRect();
  const imgRect = newImg.getBoundingClientRect();
  newImg.style.left = (e.clientX - rect.left - imgRect.width / 2) + "px";
  newImg.style.top = (e.clientY - rect.top - imgRect.height / 2) + "px";

  // Click to remove
  newImg.addEventListener("click", () => newImg.remove());
});
