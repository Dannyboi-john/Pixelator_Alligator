import { dragOverHandler as dragOverHandler } from "./drag-over-handler.js";
import { dragLeaveHandler } from "./drag-leave-handler.js";
import { dropHandler } from "./drop-handler.js";
import { dragMoveListener } from "./drag-move-listener.js";
import { createColorButton } from "./create-color-button.js";

//Gets width and height and stores them in variables
function getInput() {
  var inputx = document.getElementById("userInputx").value;
  var inputy = document.getElementById("userInputy").value;
  var gridInputx = document.getElementById("grid-constuctor-x").value;
  var gridInputy = document.getElementById("grid-constructor-y").value;
  pixelate(inputx, inputy);
  document.getElementById("img-notice").innerHTML = "Your image has been pixelated below!";
  clearGrid();
  createGrid(gridInputx, gridInputy, inputx, inputy);
  createColorButton();
};

window.dragOverHandler = dragOverHandler;
window.dragLeaveHandler = dragLeaveHandler;
window.dropHandler = dropHandler;
window.getInput = getInput;
window.dragMoveListener = dragMoveListener;
window.pixelate = pixelate;
window.createColorButton = createColorButton;

let browse = document.querySelector(".browse");
let input = document.getElementById("browse-images")

browse.onclick = () => {
  input.click();
};

input.addEventListener('change', function() {
  let file = this.files[0]
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

function pixelate(pixel_size_x, pixel_size_y) {

  if (document.getElementById("dropped_img") == null) {
    alert("Please submit an image to pixelate!");
  } else {

    // Initiate canvas in drop zone
    const element = document.getElementById("dropped_img");
    let real_width = element.naturalWidth;
    let real_height = element.naturalHeight;

    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    canvas.height = real_height;
    canvas.width = real_width;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const pixelatedImg = new Image();
    pixelatedImg.src = imgURL;

    ctx.scale((pixel_size_x / real_width), (pixel_size_y / real_height));
    ctx.drawImage(pixelatedImg, 0, 0);

    // Make next drawing erase what's currently on the canvas
    ctx.globalCompositeOperation = 'copy';

    // Nearest Neighbor
    ctx.imageSmoothingEnabled = false;
                        
    // Scale up
    ctx.setTransform((real_width / pixel_size_x), 0, 0, (real_height / pixel_size_y), 0, 0);

    var hRatio = canvas.width / pixelatedImg.width;
    var vRatio = canvas.height / pixelatedImg.height;
    var ratio = Math.min(hRatio, vRatio);
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, (canvas.width*ratio), (canvas.height*ratio));
    
    // reset all to defaults
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.imageSmoothingEnabled = true;

    // Grab dataURL of pixelated image

  };
};

function createGrid(x, y, px, py) {
 
  const gridSelector = document.getElementById("grid-supercontainer");

  // Initiates the grid based on passed-in parameters
  for (var columns = 0; columns < y; columns++) {
    for (var rows = 0; rows < x; rows++) {
      // Creates a unit of 1 empty div
      var unit = $(`<div class='grid' id='cell${columns}${rows}'></div>`);
      unit.appendTo('#grid-container');
    };
  };

  // Gets the size of the empty div and populates it according to size
  $(".grid").width(gridSelector.offsetWidth / x);
  $(".grid").height(gridSelector.offsetHeight / y);

  // Changes the square to black on click.
  $(".grid").click(function() {
      $(this).toggleClass("clicked-grid");
  });

  // Places pixelated image in grid-supercontainer
  var heightRatio = py/y;
  var widthRatio = px/x;
  const gridSize = document.getElementById("grid-container");
  var imageCreator = document.createElement("img");
  imageCreator.setAttribute("id", "grid-image");
  imageCreator.setAttribute("class", "pixelated-image");
  imageCreator.setAttribute("width", (widthRatio * gridSize.offsetWidth));
  imageCreator.setAttribute("height", (heightRatio * gridSize.offsetHeight));
  let canvas = document.getElementById("myCanvas");
  const pixelatedURL = canvas.toDataURL();
  imageCreator.src = pixelatedURL;

  gridSelector.appendChild(imageCreator);
};


function clearGrid() {
  document.getElementById("grid-container").innerHTML = "";
  // If an image is submitted already, clear image. else, display normally.
  let imageRemover = document.getElementById("grid-image");
  if (imageRemover === null) {
    console.log("");
  } else {
    imageRemover.parentNode.removeChild(imageRemover);
  }
};

function getGridSize() {
  const imgHeight = document.getElementById("grid-image").naturalHeight;
  const imgWidth = document.getElementById("grid-image").naturalWidth;
};






const position = { x: 0, y: 0 }

var x = 0
var y = 0

interact('.pixelated-image')
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
        target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
      }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
      outer: 'parent'
      }),
 
      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 }
      })
    ],

    inertia: false
  })
/*    .draggable({
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener
    }
  })
  */




   .draggable({
    modifiers: [
      interact.modifiers.snap({
        targets: [
          interact.snappers.grid({ x: 30, y: 30 })
        ],
        range: Infinity,
        relativePoints: [ { x: 0, y: 0 } ]
      }),
      interact.modifiers.restrict({
        restriction: 'parent',
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
        endOnly: true
      })
    ],
    inertia: true
  })
  .on('dragmove', function (event) {
    x += event.dx
    y += event.dy

    event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
  })
 


var darkModeIcon = document.getElementById("dark");
darkModeIcon.onclick = function() {
  document.body.classList.toggle("dark-theme");
}