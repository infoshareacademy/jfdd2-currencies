

$(document).ready(function () {
  var offset = 200;
  var duration = 500;
  $(window).scroll(function () {

   var scrollTop = $(this).scrollTop();

    if (scrollTop > offset) {
      $('.back-to-top').fadeIn(duration);
    } else {
      $('.back-to-top').fadeOut(duration);
    }



    var $menu = $('.menu');
    if (scrollTop == 0){
      $menu.removeClass('menu-small');
    } else {
      $menu.addClass('menu-small');
    }



  });

  $('.back-to-top').click(function (event) {
    event.preventDefault();
    $('html, body').animate({scrollTop: 0}, duration);
    return false;
  });

  // ZAPOBIEGANIE WYSYŁANIA PUSTGO FORMULARZA
    $('#form').submit(function (item) {
      if ($.trim($('#email').val()) === "" && $.trim($('#telephone').val()) === ""){
      item.preventDefault();
      alert('Please fill out one of the fields to submit properly');
      }
    });

});