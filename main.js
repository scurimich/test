$(function() {
  var container = $('.container');
  var screens = $('.screen');
  var body = $('body');

  var prevTouchPosition;

  $(document).on('mousewheel touchmove wheel', function(e) {
    e.stopPropagation();
    e.preventDefault();
    $(window).scrollTop(0);
    if (body.hasClass('wheel-prevented')) return;
    var direction = (e.originalEvent.wheelDelta || -e.originalEvent.deltaY)
      || (e.pageY - prevTouchPosition || e.changedTouches[0].pageY - prevTouchPosition);
    var activeScreen = $('.screen.active');
    var activeScreenDirection = activeScreen.data('direction');
    var activeScreenNext = activeScreen.data('next');
    var prevScreen = $(screens[activeScreen.data('prev') - 1]);
    prevTouchPosition = e.pageY || e.changedTouches[0].pageY;
    
    if (direction < 0 && activeScreenNext) {
      moveScreen(activeScreenDirection, direction);
      activeScreen.removeClass('active');
      $(screens[activeScreenNext - 1]).addClass('active');
    }
    if (direction > 0 && prevScreen.length) {
      moveScreen(prevScreen.data('direction'), direction);
      activeScreen.removeClass('active');
      prevScreen.addClass('active');
    }
  });

  $(document).on('touchend mouseup', function() {
    prevTouchPosition = NaN;
  });

  $(document).on('click touchend', '.js-scroll', function() {
    moveScreen('top', -1);
    $('.screen.active').removeClass('active');
    $(screens[2]).addClass('active');
  });

  $('.container').on('transitionend webkitTransitionEnd oTransitionEnd', function() {
    body.removeClass('wheel-prevented');
  });

  function moveScreen(direction, scrollDirection) {
    body.addClass('wheel-prevented');
    if (scrollDirection < 0)
      switch (direction) {
        case 'left': container.attr('class', 'container').addClass('left'); break;
        case 'top': container.attr('class', 'container').addClass('top'); break;
        case 'bottom': container.attr('class', 'container').addClass('bottom'); break;
        default: container.attr('class', 'container').addClass('top'); break;
      }
    if (scrollDirection > 0)
      switch (direction) {
        case 'left': container.attr('class', 'container').addClass('top'); break;
        case 'top': container.attr('class', 'container'); break;
        case 'bottom': container.attr('class', 'container').addClass('left'); break;
        default: container.attr('class', 'container').addClass('top'); break;
      }
  }
});