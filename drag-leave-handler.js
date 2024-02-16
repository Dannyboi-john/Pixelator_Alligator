export function dragLeaveHandler(ev) {
  //Changes text within photo-reciever back to normal.
  ev.preventDefault();
  const dragText = document.querySelector('.photo-reciever');
  dragText.innerHTML = `Drag and drop images here! or <span class="browse">browse</span> <input type="file" id="browse-images" hidden/></div>`;

  let browse = document.querySelector(".browse");
  let input = document.getElementById("browse-images")

  browse.onclick = () => {
    input.click();
  };
  };