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

  // Append first to container
  rightColumn.appendChild(newImg);

  // Wait for image to load to get correct width/height
  newImg.onload = () => {
    // Get container position relative to page
    const containerRect = rightColumn.getBoundingClientRect();
    const scrollLeft = window.pageXOffset;
    const scrollTop = window.pageYOffset;

    const containerX = containerRect.left + scrollLeft;
    const containerY = containerRect.top + scrollTop;

    // Calculate drop position relative to container and center image
    const mouseX = e.pageX - containerX;
    const mouseY = e.pageY - containerY;

    newImg.style.left = (mouseX - newImg.width / 2) + "px";
    newImg.style.top = (mouseY - newImg.height / 2) + "px";
  };

  // Click to remove
  newImg.addEventListener("click", () => newImg.remove());
});
