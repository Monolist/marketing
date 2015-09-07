'use strict';

import $                 from 'jquery';

import footerPositioning from './footerPositioning';

function route(path, cb) {
  let regex = new RegExp(path, 'i');

  cb = cb || function() {};

  if ( path === '*' ) {
    cb();
  } else if ( (path === 'index' || path === '' || path === '/') && window.location.pathname === '/' ) {
    cb();
  } else if ( path.length > 1 && regex.test(window.location.pathname) ) {
    cb();
  }
}

$(document).ready(() => {

  route('/', () => {
    let $content = $('.content');
    let $scrollDownButton = $('.scroll-down-container');
    let $copyrightDateSpan = $('.year-span');

    $copyrightDateSpan.text((new Date().getFullYear()).toString());

    $scrollDownButton.click(() => {
      $('html, body').animate({
        scrollTop: $content.offset().top
      }, 1500);
    });

    require('./scrollHandler');
  });

  route('/contact', () => {
    require('./contactPage');
    footerPositioning();
  });

  route('/about', () => {
    footerPositioning();
  });

  route('/privacy', () => {
    footerPositioning();
  });

});