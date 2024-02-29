export function pixelate(pixel_size_x, pixel_size_y) {
  if (pixel_size_x === "" || pixel_size_y === "") {
    alert("Please enter a value for length and width :)")
  } else if (document.getElementById("cell") != null) {
    clearGrid();
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

      //Shows the canvas again if grid has been created first
      var canvasHider = document.getElementById("myCanvas");
      canvasHider.style.display = "block";

      //Hides the Grid buttons as well.
      var buttonHider = document.getElementById("grid-buttons-id");
      buttonHider.style.display = "none";

      document.getElementById("img-notice").innerHTML = "Your image has been pixelated below!";

  } else if (document.getElementById("dropped_img") == null) {
    alert("Please submit an image to pixelate!");
  } else { 

    clearGrid();

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

    var canvasShow = document.getElementById("myCanvas");
    canvasShow.style.display = "block";

    document.getElementById("img-notice").innerHTML = "Your image has been pixelated below!";

    var buttonHider = document.getElementById("grid-buttons-id");
    buttonHider.style.display = "none";
  };
};