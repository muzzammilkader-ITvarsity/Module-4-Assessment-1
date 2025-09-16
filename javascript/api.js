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

// Drop event - drop point unchanged
rightColumn.addEventListener("drop", e => {
  e.preventDefault();
  rightColumn.style.border = "2px dashed transparent";

  const src = e.dataTransfer.getData("text/plain");
  if (!src) return;

  const newImg = document.createElement("img");
  newImg.src = src;
  newImg.className = "added";
  newImg.style.position = "absolute";

  // Append first so size can be calculated
  rightColumn.appendChild(newImg);

  newImg.onload = () => {
    const rect = rightColumn.getBoundingClientRect();
    const x = e.clientX - rect.left - newImg.width / 2;
    const y = e.clientY - rect.top - newImg.height / 2;
    newImg.style.left = x + "px";
    newImg.style.top = y + "px";

    // SCALE ONLY: adjust image width based on type
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
      newImg.style.width = "100px"; // default for other images
    }
  };

  // Click to remove
  newImg.addEventListener("click", () => newImg.remove());
});
