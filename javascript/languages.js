$(document).ready(function () {
  $('.js-en').click(function () {
    $('.polski').hide();
    $('.angielski').show();
  });
});

$('.js-pl').click(function () {
  $( '.polski').show();
  $('.angielski').hide();
});
