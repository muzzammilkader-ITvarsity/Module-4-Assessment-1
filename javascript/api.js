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

  const rect = rightColumn.getBoundingClientRect();
  newImg.style.left = (e.clientX - rect.left) + "px";
  newImg.style.top = (e.clientY - rect.top) + "px";

  // Click to remove
  newImg.addEventListener("click", () => newImg.remove());

  rightColumn.appendChild(newImg);
});
