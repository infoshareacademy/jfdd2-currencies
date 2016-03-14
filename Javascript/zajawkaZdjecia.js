$(document).ready(function () {

var backgrounds = [
  'url(images/zajawka-bg2-monopoly.png)',
  'url(images/zajawka-bg2-banknotes.png)',
  'url(images/zajawka-bg.png)'
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