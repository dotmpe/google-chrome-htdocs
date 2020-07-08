/**
 * The browser-action script runs in the popup page that appears when the
 * button is pressed.
 */

var activeTab = function(cb) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
  	cb(tabs[0]);
	});
}

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

var get_active_tab_title = function(cb) {

	activeTab( function(tab) {
    chrome.tabs.sendMessage(tab.id, {
      name: 'get-title'
    }, function(response) {
    	console.log('get-title >', response);
    	if (response.hasOwnProperty("name") && response.name == "title") {
    		$('#doc-title').text(response.text);
				if (cb) {
					cb(response.text);
				}
			} else {
    		show_no_connection();
			}
		});
	});
};

var show_no_connection = function() {
  $('#no-connection').show();
	$('#check-connection:parent').show();
};
var hide_no_connection = function() {
	$('#no-connection').hide();
	$('#check-connection:parent').hide();
}

var check_active_tab = function(cb) {

	activeTab( function(tab) {
    chrome.tabs.sendMessage(tab.id, {
      name: 'ping'
    }, function(response) {
    	console.log('ping >', response);
    	if (response.hasOwnProperty("name") && response.name == "pong") {
				hide_no_connection();
			} else {
				show_no_connection();
			}
			if (cb) {
    		cb(response.name == "pong");
			}
		});
	});
}

$(document).ready(function() {
	// Start logging to new console
  console.log('Browser-Action Popup loading...');

  $('a#get-selection').click(function(evt) {
    request_selection();
  });

  $('a#get-title').click(function(evt) {
    get_active_tab_title();
  });

  $('a#check-connection').click(function(evt) {
    check_active_tab();
  });

  check_active_tab(function() {
  	get_active_tab_title();
  	request_selection();
  });

  console.log('Browser-Action Popup ready');
});
