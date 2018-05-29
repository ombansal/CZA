(function($) {
  $.fn.showMoreItems = function(options) {

    var $totalItems = $('.item-list li').length,
        $visibleItems = $('.item-list li:visible').length,
        settings = $.extend({}, $.fn.showMoreItems.defaults, options),
        i = settings.count,
        countLess = settings.count - 1;

    $('.item-list li:lt(' + settings.count + ')').show();

    $('.more-trigger').click(function(el) {
      el.preventDefault();

      if ($visibleItems !== $totalItems) {
        if(i + settings.count <= $totalItems) {
          $visibleItems = i += settings.count;
          $('.item-list li:lt('+ i +')').show();

          if(i == $totalItems) {
            $('.more-trigger').text("Show Less");
          }

        } else if (i !== $totalItems) {
          $('.item-list li:gt(' + countLess + ')').show();
          $('.more-trigger').text("Show Less");
          $visibleItems = $totalItems;
          i = $totalItems;
        }
      } else if($visibleItems === $totalItems) {
        $('.item-list li:gt(' + countLess + ')').hide();
        $('.more-trigger').text("Read More");
        $visibleItems = settings.count;
        i = settings.count;
      }

    });
  }

  $.fn.showMoreItems.defaults = {
    count: 3
  };
})(jQuery);
