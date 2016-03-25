$(function () {
  $(window).on('resize load scroll', function () {
    var offsets = [],
      windowScroll = $(this).scrollTop();

    $('.menu1 a').each(function () {
      var containerId = $(this).attr('href');
      var offset = $(containerId).offset().top;
      offsets.push({
        name: containerId,
        value: Math.floor(offset)
      });
    }).removeClass('selected');

    console.log(offsets);

    offsets.push({name: 'infinity', value: Infinity});

    offsets.sort(function (a, b) {
      return a.value - b.value;
    }).reduce(function (prev, next) {
      console.log(prev, next);
      if (windowScroll >= prev.value && windowScroll < next.value) {
        $('.menu1 a[href="' + prev.name + '"]').addClass('selected');
      }
      return next;
    });
  });
});