$(document).ready(function() {
  $("#tabs ul li:first-child a").addClass("active");
  $($("#tabs ul li:first-child a").attr("href")).addClass("active");

  $("#tabs ul li a").click(function(e) {
    e.preventDefault();

    $("#tabs ul li a").removeClass("active");
    $("#tabs div").removeClass("active");

    $(this).addClass("active");
    $($(this).attr("href")).addClass("active");
  });
});
