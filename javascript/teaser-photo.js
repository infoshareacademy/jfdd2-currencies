$(document).ready(function () {

var backgrounds = [
  'url(images/teaser-bg2-monopoly.png)',
  'url(images/banknotes)',
  'url(images/teaser-bg.png)'
];
var currentBackgroundId = 0;

function setBackground(backgroundId) {
  $('header').css({
    'background': backgrounds[backgroundId],
    'background-position': 'bottom'
  });
}

setInterval(function () {
  setBackground(currentBackgroundId);
  currentBackgroundId++;
  currentBackgroundId %= backgrounds.length;


}, 4000);

});