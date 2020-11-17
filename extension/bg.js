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


document.addEventListener('DOMContentLoaded', function() {

  connectHost1();

  var open_urls;
  getUrls(function(urls) {
    console.log("Promise complete; Found open tabs:", urls);
    open_urls = urls;
    setUrlsUI(urls);
  });
  console.debug('Htdocs bg script started');
});
