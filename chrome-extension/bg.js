// requires BlueBird or other Promise lib.
// requires underscore and jQ
console.debug('bg starting');


var postUrls = function(urls) {

  //$.ajax( {
  //  url: "http://localhost:3000/chrome",
  //  data: { 'urls': urls },
  //  method: "POST",
  //    error: function(jqXHR, textStatus, errorThrown) {
  //      console.log("No connection");
  //    },
  //    success: function(data, textStatus, jqXHR) {
  //    }
  //} );
};


chrome.windows.getAll(null, function(windows) {

	var urls = [],
		tasks = []
	;

	for (var i in windows) {
		var w=windows[i];
		tasks.push(new Promise(function(resolve, reject) {
			chrome.tabs.getAllInWindow(w.id, function(tabs) {
				for (var j in tabs) {
					console.log(w.id, tabs[j].id, tabs[j].url);
					urls.push(tabs[j].url);
				}
				resolve();
			});
		}));
	}

	Promise.all(tasks).then(function() {
	  console.log("Found open tabs:", urls);
	  chrome.browserAction.setBadgeText( {
	    text: String(urls.length)
	  });
	});

});

console.debug('bg loaded');
