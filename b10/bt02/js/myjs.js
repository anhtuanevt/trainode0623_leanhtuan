$(document).ready(function() {
  $('#open-popup-btn').click(function() {
    $('#popup-overlay').fadeIn().addClass('open');
    $('.number').addClass('animate-number');
    setTimeout(function() {
      $('.congratulations').addClass('animate-congratulations');
    }, 1500);
  });
  
  $('#popup-overlay').click(function(e) {
    if (e.target.id === 'popup-overlay') {
      $('#popup-overlay').fadeOut().removeClass('open');
      $('.number').removeClass('animate-number');
      $('.congratulations').removeClass('animate-congratulations');
    }
  });
});
