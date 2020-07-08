/**
 * The background process connects to a FIFO (named pipe) and relays
 * incoming requests to the popup or page. This is done with a
 * 'stdio' native messaging host. However because responses seems to hang
 * in the buffer until the process is closed, a separate message-service (to
 * another FIFO) is used to write responses.
 */
// Promise should be built into Chrome.
// Otherwise requires BlueBird or other lib.
// Also requires underscore and jQ?

var plugin_title = "HtDocs"
//chrome.browserAction.getTitle({}, function(result) {
//  plugin_title = result;
//});

var open_urls;
chrome.windows.getAll(null, function(windows) {

	var urls = [],
		tasks = []
	;

	for (var i in windows) {
		var w=windows[i];
		tasks.push(new Promise(function(resolve, reject) {
			chrome.tabs.getAllInWindow(w.id, function(tabs) {
				for (var j in tabs) {
					// console.log("Found tab", w.id, tabs[j].id, tabs[j].url);
					urls.push(tabs[j].url);
				}
				resolve();
			});
		}));
	}

	Promise.all(tasks).then(function() {
	  open_urls = urls;
	  console.log("Promise complete; Found open tabs:", urls);
	  chrome.browserAction.setBadgeText( {
	    text: String(urls.length)
	  });
	  chrome.browserAction.setTitle( {
      title: plugin_title+":"+String(urls.length)+" open URLs"
	  });
	});
});
