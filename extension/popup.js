/**
 * The browser-action script runs in the popup page that appears when the
 * button is pressed.
 */

var request_selection = function() {
  activeTab(function(tab) {
    chrome.tabs.sendMessage(tab.id, {
      name: 'get-selection'
    }, function(response) {

      console.log('popup', 'selection', response);
      if (response.selection && response.selection.text) {
        $('#selected-text').text(response.selection.text);
      }
    });
  });
};

var show_no_be_connection = function() {
  $('#no-be-connection').show();
  $('#check-be-connection:parent').show();
};
var hide_no_be_connection = function() {
  $('#no-be-connection').hide();
  $('#check-be-connection:parent').hide();
}

var show_no_tab_connection = function() {
  $('#no-tab-connection').show();
  $('#check-tab-connection:parent').show();
};
var hide_no_tab_connection = function() {
  $('#no-tab-connection').hide();
  $('#check-tab-connection:parent').hide();
}

document.addEventListener('DOMContentLoaded', function() {

  // Start logging to new console
  console.log('HtDocs (Browser-Action Popup) script started...');

  $('a#get-selection').click(function(evt) {
    request_selection();
  });

  $('a#get-title').click(function(evt) {
    get_active_tab_title();
  });

  $('a#check-be-connection').click(function(evt) {
    check_backend();
  });

  $('a#check-tab-connection').click(function(evt) {
    check_active_tab();
  });

  check_active_tab(function() {
    get_active_tab_info();
    request_selection();
  });

  console.log('Browser-Action Popup ready');
});
