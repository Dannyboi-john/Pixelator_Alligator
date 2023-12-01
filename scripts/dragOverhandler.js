export function dragOverHandler(ev) {
    //Prevents default behaviour
    console.log('Files in drop zone!');
    ev.preventDefault();
    dragText.textContent = 'Release to Upload!';
  };