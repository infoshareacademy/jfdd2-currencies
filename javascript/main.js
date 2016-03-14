/**
 * Created by olaf on 09.03.16.
 */

$(document).ready(function () {
  var offset = 200;
  var duration = 500;
  $(window).scroll(function () {
    if ($(this).scrollTop() > offset) {
      $('.back-to-top').fadeIn(duration);
    } else {
      $('.back-to-top').fadeOut(duration);
    }
  });

  $('.back-to-top').click(function (event) {
    event.preventDefault();
    $('html, body').animate({scrollTop: 0}, duration);
    return false;
  });

  // ZAPOBIEGANIE WYSYŁANIA PUSTGO FORMULARZA

  /*if ($.trim($("#email").val()) === "" && $.trim($(" #telephone").val()) === "" ) {
   $('#form').submit(function(item) {
   item.preventDefault();
   alert('Please fill out one of the fields to submit properly');
   })
   }*/
});