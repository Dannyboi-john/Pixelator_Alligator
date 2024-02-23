// Creates a button that clears all shaded cells
export function createClearButton()  {
   let ClearButtonInfo = '<button class="clear-button-class" id="clear-button-id">Clear colored cells</button>';
    document.getElementById("clear-cells-container-id").innerHTML = ClearButtonInfo;
    $(document).ready(function() {
      $(".clear-button-class").click(function() {
        //$(".clicked-grid").removeClass("clicked-grid");
        $(".grid").css("background-color", "transparent");
      });
    }); 
  };