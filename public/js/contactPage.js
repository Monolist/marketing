'use strict';

var $ = require('jquery');

module.exports = (function() {

  var $resetForm        = $('#reset-form');
  var $successContainer = $('.success-container');
  var $emailInput       = $('input#email');
  var $messageInput     = $('textarea#message');
  var $submitButton     = $('input#submit');
  var $spinnerContainer = $('.spinner-container');
  var $errorContainer   = $('.error-container');

  $('#contact-form input, #contact-form textarea').focus(function() {
    var labelId = '#' + $(this).attr('id') + '-label';
    $(labelId).addClass('active');
  });

  $('#contact-form input, #contact-form textarea').blur(function() {
    var labelId = '#' + $(this).attr('id') + '-label';
    $(labelId).removeClass('active');
  });

  $('#contact-form input, #contact-form textarea').keyup(function() {
    var email = $emailInput.val();
    var message = $messageInput.val();

    if ( !email.length || !message.length ) {
      $submitButton.prop('disabled', true);
    } else {
      $submitButton.prop('disabled', false);
    }
  });

  $('#contact-form').submit(function(evt) {
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
    }).then(function() {
      $errorContainer.hide();
      $spinnerContainer.hide();
      $resetForm.hide();
      $successContainer.show();
    }).fail(function(err) {
      console.log('error:', err);
      var responseText = err.responseText ? JSON.parse(err.responseText) : err.statusText;
      var error = responseText.error || 'An error occurred, please try again.';
      $spinnerContainer.hide();
      $errorContainer.text(error);
      $errorContainer.show();
      $submitButton.val('Send').prop('disabled', false);
    });
  });

})();