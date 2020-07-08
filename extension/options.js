var default_options = {
    fifoServer: true,
    fifoOut: true
  };

// Saves options to chrome.storage
function save_options() {
  var fifoServer = document.getElementById('enable-server').checked;
  var fifoOut = document.getElementById('enable-triggers').checked;
  chrome.storage.sync.set({
    fifoServer: fifoServer,
    fifoOut: fifoOut
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {

  chrome.storage.sync.get(default_options, function(items) {
    document.getElementById('enable-server').checked = items.fifoServer;
    document.getElementById('enable-triggers').checked = items.fifoOut;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
