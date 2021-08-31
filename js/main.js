$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

jQuery.fn.extend({
  onAppearanceAddClass: function(class_to_add) {
    var $window = $( window ),
        window_height = $window.height(),
        array_of_$elements = [];
    this.each(function(i,el) {
      array_of_$elements.push($( el ));
    })
    scrollHandler();
        if (array_of_$elements.length) {
      $window.on('resize', resizeHandler).on('resize', scrollHandler).on('scroll', scrollHandler);
    }
    function resizeHandler() {
      window_height = $window.height();
    }
    function watchProcessedElements(array_of_indexes) {
        var l, i;
      for (l = array_of_indexes.length, i = l - 1; i > -1; --i) {
        array_of_$elements.splice(array_of_indexes[i], 1);
      }
      if (!array_of_$elements.length) {
        $window.off('resize', resizeHandler).off('scroll', scrollHandler).off('resize', scrollHandler);
      }
    }
    function scrollHandler() {
      var i, l, processed = [];
      for ( l = array_of_$elements.length, i = 0; i < l; ++i ) {
        if ($window.scrollTop() + window_height > array_of_$elements[i].offset().top) {
          array_of_$elements[i].addClass(class_to_add);
          processed.push(i); 
        }
      }
      if (processed.length) {
        watchProcessedElements(processed);
      }
    }
    return this;
  }
})

$('.flower').onAppearanceAddClass('animate__animated animate__fadeInDown');






/*$(window).scroll(function(){
    var el = $('.flower-1')

    if ( $(this).scrollTop() < el.offset().top - 200 ) {
        el.addClass('animate__animated animate__bounce');
    }
});

$(window).scroll(function(){
    var el = $('.flower-2')

    if ( $(this).scrollTop() > el.offset().top - 300 ) {
        el.addClass('animate__animated animate__bounce');
    }
});

*/

$(document).ready(function () {
 
    var show = true;
    var countbox = ".benefits__inner";
    $(window).on("scroll load resize", function () {
        if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
        var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
        var e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
        var w_height = $(window).height(); // Высота окна браузера
        var d_height = $(document).height(); // Высота всего документа
        var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
        if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
            $('.benefits__number').css('opacity', '1');
            $('.benefits__number').spincrement({
                thousandSeparator: "",
                duration: 3000
            });
             
            show = false;
        }
    });
 
});