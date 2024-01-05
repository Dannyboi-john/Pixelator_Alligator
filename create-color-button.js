export function createColorButton() {
    let buttonInfo = '<button class="color-button-class" id="color-button-id">Click to color cells</button>';
    document.getElementById("color-button-container-id").innerHTML = buttonInfo;
    $(document).ready(function() {
      $(".color-button-class").click(function() {
        $("#grid-image").toggleClass("pixelated-image hide-active");
      });
    });
  };
  