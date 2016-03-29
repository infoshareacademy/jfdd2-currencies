function goToByScroll(href) {

  $('body, html').animate({scrollTop:($(href).offset().top)-10
  },'slow')
}

$(".menu1 a").click(function (e) {
  e.preventDefault();
  goToByScroll($(this).attr('href'));
});