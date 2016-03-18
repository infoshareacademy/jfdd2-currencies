$(document).ready(function() {
  var myWindow;
  $('form').submit(openWin);

  function openWin() {
    myWindow = window.open("", "myWindow", "width=200, height=100");
    myWindow.document.write("<p>We hate Othello</p>");
    return false;
  }

  function closeWin() {
    myWindow.close();
  }

});







