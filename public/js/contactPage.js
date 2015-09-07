'use strict';

import $ from 'jquery';

module.exports = (function() {

  let $resetForm        = $('#reset-form');
  let $successContainer = $('.success-container');
  let $emailInput       = $('input#email');
  let $messageInput     = $('textarea#message');
  let $submitButton     = $('input#submit');
  let $spinnerContainer = $('.spinner-container');
  let $errorContainer   = $('.error-container');

  $('#contact-form input, #contact-form textarea').focus(function() {
    let labelId = '#' + $(this).attr('id') + '-label';
    $(labelId).addClass('active');
  });

  $('#contact-form input, #contact-form textarea').blur(function() {
    let labelId = '#' + $(this).attr('id') + '-label';
    $(labelId).removeClass('active');
  });

  $('#contact-form input, #contact-form textarea').keyup(function() {
    let email = $emailInput.val();
    let message = $messageInput.val();

    if ( !email.length || !message.length ) {
      $submitButton.prop('disabled', true);
    } else {
      $submitButton.prop('disabled', false);
    }
  });

  $('#contact-form').submit((evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    $errorContainer.hide();
    $spinnerContainer.show();
    $submitButton.val('Sending...').prop('disabled', true);

    $.ajax({
      type: 'POST',
      url: 'https://monolist.co/api/v1/contact',
      data: {
        email: $emailInput.val(),
        body: $messageInput.val()
      }
    }).then(() => {
      $errorContainer.hide();
      $spinnerContainer.hide();
      $resetForm.hide();
      $successContainer.show();
    }).fail((err) => {
      console.log('error:', err);
      let responseText = err.responseText ? JSON.parse(err.responseText) : err.statusText;
      let error = responseText.error || 'An error occurred, please try again.';
      $spinnerContainer.hide();
      $errorContainer.text(error);
      $errorContainer.show();
      $submitButton.val('Send').prop('disabled', false);
    });
  });

})();