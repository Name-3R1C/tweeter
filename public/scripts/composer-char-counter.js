$(document).ready(function() {
  console.log("document ready");
  
  $("textarea").on("input", function() {
    const str = $(this).val();
    const wordLeft = 140 - str.length;
    const counter = $(this).siblings("div").find(".counter").val(wordLeft);
    if (wordLeft >= 0) {
      counter.css("color", "black");
    } else {
      counter.css("color", "red");
    }
  });
});