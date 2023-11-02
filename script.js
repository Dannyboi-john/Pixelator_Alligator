

//Gets width and height and stores them in variables
function getInput() {
  var inputx = document.getElementById("userInputx").value;
  var inputy = document.getElementById("userInputy").value;
  pixelate(inputx, inputy)
  document.getElementById("img-notice").innerHTML = "Your image has been pixelated below!";
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
  dragText.textContent = 'Drag and drop images from your file manager into this Drop Zone!';
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
  console.log(`Width: ${element.naturalWidth}`);
  console.log(`Height: ${element.naturalHeight}`);
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
};

