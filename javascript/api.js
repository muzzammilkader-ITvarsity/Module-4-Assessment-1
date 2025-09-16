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

// Drop event - image sticks exactly at cursor with adjusted size
rightColumn.addEventListener("drop", e => {
  e.preventDefault();
  rightColumn.style.border = "2px dashed transparent";

  const src = e.dataTransfer.getData("text/plain");
  if (!src) return;

  const newImg = document.createElement("img");
  newImg.src = src;
  newImg.className = "added";
  newImg.style.position = "absolute";

  // Append first so we can adjust
  rightColumn.appendChild(newImg);

  // Adjust size based on type of image to fit stickman
  if (src.includes("hat")) {
    newImg.style.width = "70px";
  } else if (src.includes("eyes")) {
    newImg.style.width = "50px";
  } else if (src.includes("mouth")) {
    newImg.style.width = "40px";
  } else if (src.includes("shirt")) {
    newImg.style.width = "120px";
  } else if (src.includes("pants")) {
    newImg.style.width = "100px";
  } else if (src.includes("shoe")) {
    newImg.style.width = "40px";
  } else {
    newImg.style.width = "100px"; // default
  }

  // Position at cursor exactly
  newImg.onload = () => {
    const rect = rightColumn.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    newImg.style.left = (mouseX - newImg.width / 2) + "px";
    newImg.style.top = (mouseY - newImg.height / 2) + "px";
  };

  // Click to remove
  newImg.addEventListener("click", () => newImg.remove());
});
