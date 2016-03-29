$(document).ready(function() {
  var myWindow;
  $('form').submit(openWin);

  function openWin() {
    myWindow = window.open("http://www.currencies.jfdd2.infoshareaca.nazwa.pl/othello/", "myWindow", "width=1000, height=800");
    //myWindow.document.write("<p>We hate Othello</p>");
    return false;
  }

  function closeWin() {
    myWindow.close();
  }

});







