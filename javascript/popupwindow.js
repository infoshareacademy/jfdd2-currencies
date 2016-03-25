$(document).ready(function() {
  var myWindow;
  $('form').submit(openWin);

  function openWin() {
    myWindow = window.open("http://localhost:63342/jfdd2-currencies/othello/", "myWindow", "width=1000, height=800");
    //myWindow.document.write("<p>We hate Othello</p>");
    return false;
  }

  function closeWin() {
    myWindow.close();
  }

});







