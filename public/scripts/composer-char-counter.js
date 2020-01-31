$(document).ready(function() {
  $(".text-box").on("input", function(e) {
    //shrink and grow the text box
    this.style.height = 30 + "px";
    this.style.height = this.scrollHeight + "px";

    let txtLength = this.value.length;
    let counter = msgLength(txtLength);

    //logic for the counter
    if (counter < 140) {
      $(".error-container").empty();
    }

    if (counter < 0) {
      $(".error-container").html(noTextOrTolongError(false, true));
      $(".counter").addClass("text2Red");
    } else {
      $(".error-container").empty();
      $(".counter").removeClass("text2Red");
    }

    $(".counter").text(counter); // displays the counter in html
  });
});

const msgLength = function(txtLength) {
  return 140 - txtLength;
};
