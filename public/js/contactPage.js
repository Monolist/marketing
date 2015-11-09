'use strict';

import $ from 'jquery';

module.exports = (function() {

  const $contactForm      = $('#contact-form');
  const $successContainer = $('.success-container');
  const $emailInput       = $('input#email');
  const $messageInput     = $('textarea#message');
  const $submitButton     = $('input#submit');
  const $spinnerContainer = $('.spinner-container');
  const $errorContainer   = $('.error-container');

  $('#contact-form input, #contact-form textarea').focus(function() {
    const labelId = '#' + $(this).attr('id') + '-label';
    $(labelId).addClass('active');
  });

  $('#contact-form input, #contact-form textarea').blur(function() {
    const labelId = '#' + $(this).attr('id') + '-label';
    $(labelId).removeClass('active');
  });

  $('#contact-form input, #contact-form textarea').keyup(function() {
    const email = $emailInput.val();
    const message = $messageInput.val();

    if ( !email.length || !message.length ) {
      $submitButton.prop('disabled', true);
    } else {
      $submitButton.prop('disabled', false);
    }
  });

  $contactForm.submit((evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    $errorContainer.hide();
    $spinnerContainer.show();
    $submitButton.val('Sending...').prop('disabled', true);

    $.ajax({
      type: 'POST',
      url: 'http://api.monolist.co/v1/contact',
      data: {
        email: $emailInput.val(),
        body: $messageInput.val()
      }
    }).then(() => {
      $errorContainer.hide();
      $spinnerContainer.hide();
      $contactForm.hide();
      $successContainer.show();
    }).fail((err) => {
      const responseText = err.responseText ? JSON.parse(err.responseText) : err.statusText;
      const error = responseText.error || 'An error occurred, please try again.';
      $spinnerContainer.hide();
      $errorContainer.text(error);
      $errorContainer.show();
      $submitButton.val('Send').prop('disabled', false);
    });
  });

})();