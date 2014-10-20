chrome.windows.getAll(null, function(windows) {
	for (var i in windows) {
		var w=windows[i],
			tabs=chrome.tabs.getAllInWindow(w.id, function(tabs) {
				for (var j in tabs) {
					console.log(w.id, tabs[j].id, tabs[j].url);
				}
			});
	}
});
