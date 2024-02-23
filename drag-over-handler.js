//Dragover handler
export function dragOverHandler(ev) {
  //Prevents default behaviour
  ev.preventDefault();
  const dragText = document.querySelector('.photo-reciever');
  dragText.textContent = 'Release to Upload!';
};
