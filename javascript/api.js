// Make all left-column images draggable
document.querySelectorAll("#left-column img").forEach(img => {
    img.setAttribute("draggable", "true");

    img.addEventListener("dragstart", e => {
        e.dataTransfer.setData("src", e.target.src);
    });
});

const rightColumn = document.getElementById("right-column");

// MUST preventDefault to allow dropping
rightColumn.addEventListener("dragover", e => {
    e.preventDefault();
});

// Handle drop
rightColumn.addEventListener("drop", e => {
    e.preventDefault();

    const src = e.dataTransfer.getData("src");
    if (!src) return;

    // Create a new image for the dropped item
    const newImg = document.createElement("img");
    newImg.src = src;
    newImg.className = "added";
    newImg.style.position = "absolute";

    // Place it where the user dropped
    const rect = rightColumn.getBoundingClientRect();
    newImg.style.left = (e.clientX - rect.left - 50) + "px";
    newImg.style.top = (e.clientY - rect.top - 50) + "px";

    // Click to remove
    newImg.addEventListener("click", () => newImg.remove());

    rightColumn.appendChild(newImg);
});
