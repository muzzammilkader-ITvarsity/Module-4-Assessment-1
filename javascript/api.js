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

// Drop event - image sticks exactly at cursor
rightColumn.addEventListener("drop", e => {
  e.preventDefault();
  rightColumn.style.border = "2px dashed transparent";

  const src = e.dataTransfer.getData("text/plain");
  if (!src) return;

  const newImg = document.createElement("img");
  newImg.src = src;
  newImg.className = "added";
  newImg.style.position = "absolute";

  // Append first so we can get its dimensions
  rightColumn.appendChild(newImg);

  // Use mouse position relative to container and subtract half of image width/height
  const rect = rightColumn.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  newImg.onload = () => {
    newImg.style.left = (mouseX - newImg.width / 2) + "px";
    newImg.style.top = (mouseY - newImg.height / 2) + "px";
  };

  // Click to remove
  newImg.addEventListener("click", () => newImg.remove());
});
