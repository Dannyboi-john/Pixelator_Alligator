

//Gets width and height and stores them in variables
function getInput() {
  var inputx = document.getElementById("userInputx").value;
  var inputy = document.getElementById("userInputy").value;
  pixelate(inputx, inputy)
  document.getElementById("img-notice").innerHTML = "Your image has been pixelated below!";
  clearGrid();
  createGrid(inputx, inputy);
};

//'Enter' Event listener
document.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("myBtn").click();
    }
});

//Dragover handler
function dragOverHandler(ev) {
  //Prevents default behaviour
  console.log('Files in drop zone!');
  ev.preventDefault();
  dragText.textContent = 'Release to Upload!';
};

  function dragLeaveHandler(ev) {
  //Changes text within photo-reciever back to normal.
  ev.preventDefault();
  dragText.textContent = 'Drag and drop images here!';
  };

//Helpful text when user drags over area
const dragText = document.querySelector('.photo-reciever');


//Drop handler
function dropHandler(ev) {
  console.log("File(s) dropped!");
  ev.preventDefault();
  dragText.textContent = 'Drag and drop images from your file manager into this Drop Zone!';
  
  if (ev.dataTransfer.items) {
    //Use dataTransferItemList interface to access the file(s)
    [...ev.dataTransfer.items].forEach((item, i) => {
      //If dropped items aren't files, reject them
      if (item.kind === 'file') {
        const file = item.getAsFile();
        console.log(`… file[${i}].name = ${file.name}`);

        // Type-checking for valid image files (JPG, JPEG, PNG)
        let fileType = file.type;
        let validExtensions = ['image/jpg', 'image/jpeg', 'image/png'];

        // If dropped image is valid format, accept
        if(validExtensions.includes(fileType)) {
        const reader = new FileReader();
          reader.onload = () => {
            imgURL = reader.result;
            submitted_img = document.createElement('img');
            submitted_img.src = imgURL;
            submitted_img.setAttribute("id", "dropped_img");
            document.getElementById("drop-zone").innerHTML = ""
            document.getElementById("drop-zone").appendChild(submitted_img);

        };
        reader.readAsDataURL(file);
      } else {
        alert('Oops! Images must be of the format JPG, JPEG, or PNG!')
      };
      }
    });
  } else {
    //Use dataTransfer interface to access the files
    [...ev.dataTransfer.files].forEach((file, i) => {
      console.log(`… file[${i}].name = ${file.name}`);
    });
  }
};

// Function that gets dimensions of image. Only works sometimes??
function getImgSize() {
  const element = document.getElementById("dropped_img");
  real_width = element.naturalWidth;
  real_height = element.naturalHeight;
};

function pixelate(pixel_size_x, pixel_size_y) {

  // Initiate canvas in drop zone
  getImgSize();
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const img = new Image();
  img.src = imgURL;

  ctx.scale((pixel_size_x / real_width), (pixel_size_y / real_height));
  ctx.drawImage(img, 0, 0);

  // Make next drawing erase what's currently on the canvas
  ctx.globalCompositeOperation = 'copy';

  // Nearest Neighbor
  ctx.imageSmoothingEnabled = false;
                      
  // Scale up
  ctx.setTransform((real_width / pixel_size_x), 0, 0, (real_height / pixel_size_y), 0, 0);

  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.min(hRatio, vRatio);
  ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, (canvas.width*ratio), (canvas.height*ratio));
  
  // reset all to defaults
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = 'source-over';
  ctx.imageSmoothingEnabled = true;

  // Grab dataURL of pixelated image
  pixelatedURL = canvas.toDataURL();
};

function createGrid(x, y) {

  const gridSelector = document.getElementById("grid-supercontainer");


  // Places pixelated image in grid-supercontainer
  var imageCreator = document.createElement("img");
  imageCreator.setAttribute("id", "grid-image");
  imageCreator.src = pixelatedURL;
  gridSelector.appendChild(imageCreator);

  // Gets height and width of image.
  imageCreator.onload = function () {
    getGridSize();
  }

  // Initiates the grid based on passed-in parameters
  for (var columns = 0; columns < y; columns++) {
    for (var rows = 0; rows < x; rows++) {
      // Creates a unit of 1 empty div
      var unit = $("<div class='grid'></div>");
      unit.appendTo('#grid-container');
    //  $("#grid-container").append("<div class='grid'></div>");
    };
  };

  // Gets the size of the empty div and populates it according to size
  $(".grid").width(gridSelector.offsetWidth / x);
  $(".grid").height(gridSelector.offsetHeight / y);
};

function clearGrid() {
  document.getElementById("grid-container").innerHTML = "";
  // If an image is submitted already, clear image. else, display normally.
  let imageRemover = document.getElementById("grid-image");
  if (imageRemover === null) {
    console.log("working as indented");
  } else {
    imageRemover.parentNode.removeChild(imageRemover);
  }
};

function getGridSize() {
  const imgHeight = document.getElementById("grid-image").naturalHeight;
  const imgWidth = document.getElementById("grid-image").naturalWidth;
  console.log(`Height: ${imgHeight}`);
  console.log(`Width: ${imgWidth}`);
}
