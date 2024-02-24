// Clears the grid
export function clearGrid() {
    var gridStuff = document.getElementById("grid-container");
    let imageRemover = document.getElementById("grid-image");
    if (gridStuff.innerHTML === null) {
      console.log();
    } else if (imageRemover && gridStuff.innerHTML != null) {
      imageRemover.parentNode.removeChild(imageRemover);
      gridStuff.innerHTML = "";
    }
  }