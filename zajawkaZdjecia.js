var backgrounds = [
    'url(images/zajawka-bg1.png)',
    'url(images/zajawka-bg2.png)',
    'url(images/zajawka-bg.png)'
];
var currentBackgroundId = 0;

function setBackground(backgroundId) {
    $('header').css({'background': backgrounds[backgroundId]});
}

setInterval(function () {
    setBackground(currentBackgroundId);
    currentBackgroundId++;
    currentBackgroundId %= backgrounds.length;


}, 4000);
