// Function that creates a hide button for image.
export function createHideButton() {
    let hideButtonInfo = `<button class="hide-button-class" id="hide-button-id">Hide image</button>`;
    document.getElementById("hide-image-container-id").innerHTML = hideButtonInfo;
    $(document).ready(function() {
      $(".hide-button-class").click(function() {
        $("#grid-image").toggleClass("pixelated-image hide-fully");
        if (document.getElementById("img-notice").innerHTML === "Your image has been pixelated below!") {
          document.getElementById("img-notice").innerHTML = "Click/touch to color over image!";
        } else {
          document.getElementById("img-notice").innerHTML = "Your image has been pixelated below!";
        }

      })
    })
  };