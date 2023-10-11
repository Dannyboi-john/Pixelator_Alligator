

//Gets variables and stores them in variables
function getInput() {
  var inputx = document.getElementById("userInputx").value;
  var inputy = document.getElementById("userInputy").value;
  console.log(inputx);
  console.log(inputy);
  alert(`The number of columns and rows you have selected are ${inputx} and ${inputy}!`);
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
  }

//Helpful text when user drags over area
const dragText = document.querySelector('.photo-reciever');


//Drop handler
function dropHandler(ev) {
  console.log("File(s) dropped!");
  ev.preventDefault();
  if (ev.dataTransfer.items) {
    //Use dataTransferItemList interface to access the file(s)
    [...ev.dataTransfer.items].forEach((item, i) => {
      //If dropped items aren't files, reject them
      if (item.kind === 'file') {
        const file = item.getAsFile();
      }
    });
  } else {
    //Use dataTransfer interface to access the files
    [...ev.dataTransfer.files].forEach((file, i) => {
      console.log(`… file[${i}].name = ${file.name}`);
    });
  }
}