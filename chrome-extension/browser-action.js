console.log("Popup script");


var request_selection = function() {

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {

    chrome.tabs.sendMessage(tabs[0].id, {
      name: 'get-selection'
    }, function(response) {

      console.log('popup', 'selection', response);
      if (response.selection && response.selection.text) {
        $('#selected-text').text(response.selection.text);
      }
    });
  });

};

$(document).ready(function() {
  console.log('Popup ready');

  $('a#get-selection').click(function(evt) {
    console.log('clicked', arguments);

    request_selection();
  });

  request_selection();
});


