import { dragOverHandler as dragOverHandler } from "./drag-over-handler.js";
import { dragLeaveHandler } from "./drag-leave-handler.js";
import { dropHandler } from "./drop-handler.js";
import { dragMoveListener } from "./drag-move-listener.js";
import { createColorButton } from "./create-color-button.js";
import { createClearButton } from "./create-clear-button.js";
import { createHideButton } from "./create-hide-button.js";
import { clearGrid } from "./clear-grid.js";
import { createColorPicker } from "./create-color-picker.js";
import { pixelate } from "./pixelate.js";

scrollWin();

function scrollWin() { window.scrollTo(0, 0);}

// Function checks whether or not application is being viewed on mobile device.
function isMobile() {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
  
}

// Sets up the welcome/tips dialogue.
const welcomeModal = document.querySelector(".welcome-modal");
const closeWelcomeModal = document.querySelector(".close-welcome-button");
$(document).ready(function() {
  welcomeModal.showModal();
})
closeWelcomeModal.addEventListener('click', () => {
  welcomeModal.close();
})

const tipsButton = document.querySelector(".tips-div");
tipsButton.addEventListener('click', () =>{
  welcomeModal.showModal();
})

var clicked = false;

const pixelateButton = document.getElementById("pixelate-button");
const gridButton = document.getElementById("myBtn");

pixelateButton.addEventListener('click', function() {
  var inputx = document.getElementById("userInputx").value;
  var inputy = document.getElementById("userInputy").value;
  pixelate(inputx, inputy);
});

gridButton.addEventListener('click', function() {
  window.clicked = true;
  getInput();
});

//Gets width and height and stores them in variables
function getInput() {
  var inputx = document.getElementById("userInputx").value;
  var inputy = document.getElementById("userInputy").value;
  var gridInputx = document.getElementById("grid-constuctor-x").value;
  var gridInputy = document.getElementById("grid-constructor-y").value;

  if (parseInt(inputx) > parseInt(gridInputx) || parseInt(inputy) > parseInt(gridInputy)) {
    alert("Oops! Looks like your image is bigger than the grid!");
  } else if (parseInt(gridInputx) > 150 || parseInt(gridInputy) > 150) {
    alert("Woah! That's a lot of grid cells! Try and keep it under 150 ;)");
  } else if (inputx === "") {
    gridStandalone(gridInputx, gridInputy);
    createClearButton();
    createColorPicker();
    createColorButton();
    createHideButton();
    document.getElementById("img-notice").innerHTML = "Your grid has been created below!";
  } else if (gridInputx === "" || gridInputy === "") {
    alert("Please enter the dimensions of the grid :)");
  } else if (gridInputx && gridInputy === null) {
    pixelate(inputx, inputy);
  } else {
    pixelate(inputx, inputy);
    document.getElementById("img-notice").innerHTML = "Your image has been pixelated below!";
    clearGrid();
    createGrid(gridInputx, gridInputy, inputx, inputy);
    createColorButton();
    createClearButton();
    createHideButton();
    createColorPicker();
    updateGrid();
    reinitializeSnapping();
  }
};

window.dragOverHandler = dragOverHandler;
window.dragLeaveHandler = dragLeaveHandler;
window.dropHandler = dropHandler;
window.getInput = getInput;
window.dragMoveListener = dragMoveListener;
window.pixelate = pixelate;
window.createColorButton = createColorButton;
window.updateGrid = updateGrid;
window.reinitializeSnapping = reinitializeSnapping;
window.gridStandalone = gridStandalone;
window.createClearButton = createClearButton;
window.createHideButton = createHideButton;
window.createColorPicker = createColorPicker;
window.recalculateGrid = recalculateGrid;
window.clearGrid = clearGrid;
window.scrollWin = scrollWin;


let browse = document.querySelector(".browse");
let input = document.getElementById("browse-images")

browse.onclick = () => {
  input.click();
};

input.addEventListener('change', function() {
  let file = this.files[0];
  let fileType = file.type;
  let validExtensions = ['image/jpg', 'image/jpeg', 'image/png'];

    // If dropped image is valid format, accept
    if(validExtensions.includes(fileType)) {
    const reader = new FileReader();
      reader.onload = () => {
        window.imgURL = reader.result;
        const submitted_img = document.createElement('img');
        submitted_img.src = imgURL;
        submitted_img.setAttribute("id", "dropped_img");
        document.getElementById("drop-zone").innerHTML = ""
        document.getElementById("drop-zone").appendChild(submitted_img);

        let imageChanger = document.getElementById("dropped_img");
        imageChanger.addEventListener('click', function() {
          input.click();
        })
    };
    reader.readAsDataURL(file);
  };
});

//'Enter' Event listener
document.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("myBtn").click();
    }
});

function createGrid(x, y, px, py) {

  const gridSelector = document.getElementById("grid-supercontainer");
  const gridContainer = document.getElementById("grid-container");

  // Initiates the grid based on passed-in parameters
  for (var columns = 0; columns < y; columns++) {
    for (var rows = 0; rows < x; rows++) {
      // Creates a unit of 1 empty div
      var unit = $(`<div class='grid' id='cell'></div>`);
      unit.appendTo('#grid-container');
    };
  };

  // Gets the size of the empty div and populates it according to size
  $(".grid").width(gridContainer.offsetWidth / x);
  $(".grid").height(gridContainer.offsetHeight / y);

  // Sets minimum height and width of grid cells
  let gridMinWidth = $(".grid").width(gridContainer.getBoundingClientRect().width / x);
  $('.grid').css("min-width", gridMinWidth);
  let gridMinHeight = $(".grid").height(gridContainer.getBoundingClientRect().height / y);
  $('.grid').css("min-height", gridMinHeight);

  // Changes the square to black on click.
  var isDown = false;

  $(".grid").mousedown(function() {
    isDown = true;
  })

  $(".grid").mouseup(function() {
    isDown = false;
  })

  $(".grid").mouseover(function() {
    if(isDown) {
      $(this).css("background-color", "black");
    }
  });
  
  $(".grid").click(function() {
    $(this).css("background-color", "black");
  })


  const touchListener = document.querySelectorAll(".grid");

  Array.from(touchListener).forEach(function(element) {
    element.addEventListener("touchstart", function() {
      isDown = true;
      if (isDown) {
        element.style.backgroundColor = "black";
      }
    })
  });

  Array.from(touchListener).forEach(function(element) {
    element.addEventListener("touchend", function() {
      isDown = false;
    })
  });

  Array.from(touchListener).forEach(function(element) {
    if (isDown) {
      element.style.backgroundColor = "black";
    }
});


  // Places pixelated image in grid-supercontainer
  var heightRatio = py/y;
  var widthRatio = px/x;
  const gridSize = document.getElementById("grid-container");
  var imageCreator = document.createElement("img");

  // Sets attributes of pixelated image
  imageCreator.setAttribute("id", "grid-image");
  imageCreator.setAttribute("class", "pixelated-image");
  imageCreator.setAttribute("width", (widthRatio * gridSize.getBoundingClientRect().width));
  imageCreator.setAttribute("height", (heightRatio * gridSize.getBoundingClientRect().height));
  let canvas = document.getElementById("myCanvas");
  const pixelatedURL = canvas.toDataURL();
  imageCreator.src = pixelatedURL;


  // Appends image to the grid
  gridSelector.appendChild(imageCreator);

  // Hides canvas after image is appended
  var canvasHider = document.getElementById("myCanvas");
  canvasHider.style.display = "none";

  var showButtons = document.getElementById("grid-buttons-id")
  showButtons.style.display = "grid";


  // Logic for handling window resize / grid redraw.
  // var dwidth = $(window).width();


  window.onresize = (event) => {
    if (!(isMobile())) {
      setTimeout(recalculateGrid, 500);
    }
  };

  // window.addEventListener('resize', function() {
  //  var wwidth = $(window).width();


/*     if (isMobile()) {
      return
    } else {
      this.setTimeout(recalculateGrid, 500);
    }
  }); */
  

/*   var dwidth = $(window).width();
  if (isMobile) {
    screen.orientation.addEventListener("change", () => {
      recalculateGrid();
      alert("Screen orientation changed!/ isMobile === true");
    })
  } else {
    window.addEventListener("resize", function() {
      var wwidth  = $(window).width();
      if (dwidth !== wwidth) {
        recalculateGrid();
        this.alert("Grid Resized");
      }
      else {
        return;
      }
    });
  }
 */
  if (isMobile()) {
    console.log("true");
  };
};

function gridStandalone(x, y) {
  window.addEventListener("resize", recalculateGrid);
  const gridSelector = document.getElementById("grid-supercontainer");

  // Initiates the grid based on passed-in parameters
  for (var columns = 0; columns < y; columns++) {
    for (var rows = 0; rows < x; rows++) {
      // Creates a unit of 1 empty div
      var unit = $(`<div class='grid' id='cell'></div>`);
      unit.appendTo('#grid-container');
    };
  };

  // Gets the size of the empty div and populates it according to size
  $(".grid").width(gridSelector.offsetWidth / x);
  $(".grid").height(gridSelector.offsetHeight / y);



  // Changes the square to black on click.
  var isDown = false;
  $(".grid").mousedown(function() {
    isDown = true;
  })
  $(".grid").mouseup(function() {
    isDown = false;
  })
  $(".grid").mouseover(function() {
    if(isDown) {
      $(this).css("background-color", "black");
    }
  });
  $(".grid").click(function() {
    $(this).css("background-color", "black");
  })
}

const position = { x: 0, y: 0 }

var x = 0
var y = 0

// Get function that adjusts the size of the grid cells accordingly.
function updateGrid() {
  if (document.getElementById("cell") === null) {
    return
  } else {
    gridConfig["x"] = document.getElementById("cell").getBoundingClientRect().width;
    gridConfig["y"] = document.getElementById("cell").getBoundingClientRect().height;
  }
}

var gridConfig = {
    x: 30,
    y: 30,
};

// Recalculates the snapping distance of the draggable image on resize.
function reinitializeSnapping() {
  interact(".pixelated-image").unset()
  interact(".pixelated-image")
    .draggable({
      modifiers: [
        interact.modifiers.snap({
          targets: [
            interact.snappers.grid( gridConfig )
          ],
          range: Infinity,
          relativePoints: [ { x: 0, y: 0 } ],
          offset: 'parent'
        }),
        interact.modifiers.restrict({
          restriction: 'parent',
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          endOnly: false
        })
      ],
      inertia: false
    })
    .on('dragmove', function (event) {
      x += event.dx
      y += event.dy
  
      event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    })
}

// Recalculates the size and shape of the grid on window resize.
function recalculateGrid() {
  if (document.getElementById("cell") === null) {
    return
  } else {
    setTimeout(function() {
      document.getElementById("img-notice").innerHTML = "Recalculating your resized grid!";

      var inputx = document.getElementById("userInputx").value;
      var inputy = document.getElementById("userInputy").value;
      var gridInputx = document.getElementById("grid-constuctor-x").value;
      var gridInputy = document.getElementById("grid-constructor-y").value;

      clearGrid();
      pixelate(inputx, inputy);
      createGrid(gridInputx, gridInputy, inputx, inputy);
      updateGrid();
      reinitializeSnapping();
    }, 500)
  }
}
