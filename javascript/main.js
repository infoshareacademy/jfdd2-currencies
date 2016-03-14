

jQuery(document).ready(function () {
  var offset = 200;
  var duration = 500;
  jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery('.back-to-top').fadeIn(duration);
    } else {
      jQuery('.back-to-top').fadeOut(duration);
    }
  });

  jQuery('.back-to-top').click(function (event) {
    event.preventDefault();
    jQuery('html, body').animate({scrollTop: 0}, duration);
    return false;
  });

  // ZAPOBIEGANIE WYSYŁANIA PUSTGO FORMULARZA
    $('#form').submit(function (item) {
      if ($.trim($('#email').val()) === "" && $.trim($('#telephone').val()) === ""){
      item.preventDefault();
      alert('Please fill out one of the fields to submit properly');
      }
    })

});