/* ======================================================================================
   @MASTER JAVASCRIPT
   ====================================================================================== */

/**
 * Handy elements to keep cached
 */

var htmlElement = $('html');

/**
 * Detect touch/non-touch
 */

var isTouch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

// Add hooks
if (isTouch) {
	htmlElement.addClass('touch');
} else {
	htmlElement.addClass('no-touch');
}

/**
 * Detect Android devices
 */

var isAndroid = navigator.userAgent.match(/android/i);

// Add a hook
if (isAndroid) {
  htmlElement.addClass('android');
}

/**
 * Detect iOS devices
 */

var isiOS = navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

var isiPhone = navigator.userAgent.match(/iPhone/i);

// Add hooks
if (isiOS) {
	htmlElement.addClass('ios');
}

if (isiPhone) {
  htmlElement.addClass('iphone');
}

/**
 * Define functions
 */

// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// Generic toggle function via click event
$.fn.toggleClick = function() {

  // Store the passed arguments for future reference
  var methods = arguments;
  // Cache the number of methods
  var count = methods.length;

  // Use return this to maintain jQuery chainability
  return this.each(function(i, item){
    // For each element you bind to create a local counter for that element
    var index = 0;
    $(item).click(function(){
      // That when called will apply the 'index' th method to that element
      return methods[index++ % count].apply(this,arguments);
      // The index % count means that we constrain our iterator between 0 and (count-1)
    });
  });

};

// Toggle main menu for palm sized viewports plugin
$.fn.toggleMenu = function() {

  var btn = $('.js-menu-toggle-btn');
  var menu = $(this);
  var toggleClassName = 'is-active';

  // Set default ARIA on button
  btn.attr({'aria-expanded' : 'false', 'aria-haspopup' : 'true'});

  // Toggle on click event
  btn.toggleClick(
    // Expanded state
    function() {
      menu.toggleClass(toggleClassName);
      $(this).toggleClass(toggleClassName).attr('aria-expanded', 'true');
    },
    // Collapsed state
    function() {
      menu.toggleClass(toggleClassName);
      $(this).toggleClass(toggleClassName).attr('aria-expanded', 'false');
  })

}

/**
 * Initialise functions
 */

$(function() {

  $('.js-menu-toggle-menu').toggleMenu();

});