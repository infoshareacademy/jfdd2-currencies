(function($, window) {
  var adjustAnchor = function() {

    var $anchor = $(window.location.hash),
      fixedElementHeight = 80;

    if ($anchor.length > 0) {

      window.scrollTo(0, $anchor.offset().top - fixedElementHeight);

    }

  };

  $(window).on('hashchange load', function() {
    adjustAnchor();
  });

})(jQuery, window);