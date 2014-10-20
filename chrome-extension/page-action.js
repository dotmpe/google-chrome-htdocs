// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
	if (chrome.pageAction && tab.url) {
	// ! To access tab.url, arrange 'tabs' permission !
	//if (tab.url.indexOf('dotmpe')>-1) {
		chrome.pageAction.show(tabId);
	//}
	}
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

