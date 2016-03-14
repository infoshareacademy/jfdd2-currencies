$(document).ready(function () {
  $('.js-en').click(function () {
    $('.polski').hide();
    $('.english').show();
  });
});

$('.js-pl').click(function () {
  $( '.english').hide();
  $('.polski').show();
})
