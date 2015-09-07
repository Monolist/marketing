'use strict';

import $ from 'jquery';

module.exports = (function() {

  let documentHeight = $(document).outerHeight();
  let $footer = $('footer');
  let footerTop = $footer.offset().top;
  let footerHeight = $footer.outerHeight();

  return function() {
    if ( footerTop + footerHeight <= documentHeight ) {
      $footer.css({
        position: 'absolute',
        bottom: '0'
      });
    } else if ( $footer.css('position') === 'absolute' ) {
      $footer.css({
        position: 'relative',
        bottom: 'auto'
      });
    }
  };

})();