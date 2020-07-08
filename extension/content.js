/**
 * The content-script is allowed to run during document-idle time,
 * alongside each page (ie. for each open tab).
 *
 * It sets up to listen for messages from the popup or background scripts.
 */

function getSelectionText() {
    var text = "";
    var offset, width;
    if (window.getSelection) {
        var selection = window.getSelection();
        text = selection.toString();
        offset = selection.extentOffset;
        width = selection.anchorOffset;
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }

    return {
      text: text,

      // XXX this is local to element, no?
      offset: offset,
      width: width
    };
}

//Var browser_action_port = chrome.runtime.connect({
//  name: "x-browser-action"
//});
//Browser_action_port.onMessage.addListener(function(msg) {
//
//  if (msg.name == 'get-selection') {
//		browser_action_port.postMessage({
//      name: msg.name,
//			selection: getSelectionText()
//		});
//  }
//});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {

    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

		switch (request.name) {

      case 'ping':
        sendResponse({
          name: 'pong'
        });
        break;

      case 'get-title':
        sendResponse({
          name: 'title',
          text: window.document.title
        });
        break;

      case 'set-clipboard':
        break;
      case 'get-clipboard':
        break;

      case 'get-selection':
        sendResponse({
          name: request.name,
          selection: getSelectionText()
        });
        break;

      default:
        sendResponse({
          name: request.name+'?',
          type: 'error',
          text: 'No such handler here'
        });
        break;
    }
	}
);
