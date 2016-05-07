'use strict';


module.exports = (function() {

  var headerEl = document.getElementsByTagName('header')[0];
  var heroEl = document.getElementsByClassName('hero')[0];
  var heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
  var headerHeight = headerEl.offsetHeight;
  var currentScrollPosition;

  console.log('heroBottom - headerHeight:', heroBottom - headerHeight);

  window.addEventListener('scroll', function() {
    currentScrollPosition = window.scrollY;

    console.log('currentScrollPosition:', currentScrollPosition);

    if ( currentScrollPosition > (heroBottom - headerHeight) ) {
      console.log('is past');
      headerEl.classList.add('past-hero');
    } else {
      console.log('is not past');
      headerEl.classList.remove('past-hero');
    }
  });

})();
