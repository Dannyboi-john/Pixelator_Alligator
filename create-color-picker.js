// Function that selects color to shade cells in a modal (dialog) window.
export function createColorPicker() {
    let colorPickerInfo = `<button class="color-picker-button-class" id="color-picker-button-id">Pick a color</button>`;
    document.getElementById("color-picker-container-id").innerHTML = colorPickerInfo;
    $(document).ready(function() {
      const modal = document.querySelector(".modal");
      const openModal = document.querySelector("#color-picker-button-id");
      const closeModal = document.querySelector("#close-button-id");
      let colorInput = document.querySelector("#color-picker-id");
  
      openModal.addEventListener("click", () => {
        modal.showModal();
      })
      closeModal.addEventListener("click", () => {
        modal.close();
      })
  
      // Erases drawn squares (Makes their background transparent).
      let eraserInput = document.querySelector(".eraser");
      eraserInput.addEventListener("click", () => {
        $(".grid").click(function() {
          $(this).css("background-color", "transparent");
        })
        var isDown = false;
        $('.grid').mousedown(function() {
          isDown = true;
        })
        $('.grid').mouseup(function() {
          isDown = false;
        })
        $('.grid').mouseover(function() {
          if (isDown) {
            $(this).css("background-color", "transparent");
          }
        })
        modal.close();
      })
  
      // Event listener for color picker and associated logic.
      colorInput.addEventListener("input", () => {
        let color = colorInput.value;
        $(".grid").click(function() {
          $(this).css("background-color", color);
        })
        var isDown = false;
        $('.grid').mousedown(function() {
          isDown = true;
        })
        $('.grid').mouseup(function() {
          isDown = false;
        })
        $('.grid').mouseover(function() {
          if (isDown) {
            $(this).css("background-color", color);
          }
        })

        // Touching and dragging colors cells.
        $('.grid').bind('touchmove', function(ev) {
          var touch = ev.originalEvent.touches[0]
          touchColor(touch.clientX, touch.clientY, color)
        })

        $("#color-picker-button-id").css("color", color);
      })
    })
  }