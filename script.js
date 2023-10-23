

//Gets variables and stores them in variables
function getInput() {
  var inputx = document.getElementById("userInputx").value;
  var inputy = document.getElementById("userInputy").value;
  console.log(inputx);
  console.log(inputy);
  // alert(`The number of columns and rows you have selected are ${inputx} and ${inputy}!`);
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

        const reader = new FileReader();
        reader.onload = () => {
          let imgURL = reader.result;
          // console.log(imgURL);
          document.getElementById("drop-zone").innerHTML = `<img id="dropped-img" src="${imgURL}">`;
        };

        reader.readAsDataURL(file);
      }
    });
  } else {
    //Use dataTransfer interface to access the files
    [...ev.dataTransfer.files].forEach((file, i) => {
      console.log(`… file[${i}].name = ${file.name}`);
    });
  }
};



function pixelate(source, pixel_size) {

  // Initiate canvas in drop zone
  const canvas = document.getElementById('dropped-image');
  const ctx = canvas.getContext('2d');

  ctx.scale(1 / pixel_size, 1 / pixel_size);
  ctx.drawImage(source, 0, 0);
  // Make next drawing erase what's currently on the canvas
  ctx.globalCompositeOperation = 'copy';
  // Nearest Neighbor
  ctx.imageSmoothingEnabled = false;
  // Scale up
  ctx.setTransform(pixel_size, 0, 0, pixel_size, 0, 0);
  ctx.drawImage(canvas, 0, 0);

  // Reset all to defaults
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = 'source-over';
  ctx.imageSmoothingEnabled = true;
}
