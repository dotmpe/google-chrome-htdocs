// requires BlueBird or other Promise lib.
console.debug('bg starting');

var postUrls = function(urls) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:3000/chrome", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onreadystatechange = function(xhrevent) {
	}
	xhr.send(JSON.stringify({urls:urls}));
	//xhr.send(urls.join('\n'));
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
		postUrls(urls);
	});
});

console.debug('bg loaded');
