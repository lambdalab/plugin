// Please change the config
lambdalabConfig = {
  // Your Insight.io instance address
  url: "http://localhost:9000",
  // When a symbol is not resolvable in your Insight.io instance, e.g. java.lang.String, it could search an external
  // server for information, if it found the symbol in the external server, the plugin will show the type info, and
  // user would be able to directly navigate to the definition of the symbol in the external server.
  //
  // Set the value to "" if you don't want to symbol name to be sent out to other server.
  externalUrl: "https://insight.io",
  // If enablePlugin = false, the plugin will only affect user if they specifically append a ?enablePlugin=true query
  // parameter in their URL at first (they could disable it by append ?enablePlugin=false).
  // Otherwise, the plugin will be effecitve no matter what query parameter is set.
  enablePlugin: true
}

bundleUrl = '/assets/insightio/content.bundle.js';

var loadBundle = function() {
  var res = "";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", bundleUrl, true);
  xhr.onreadystatechange = function(e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var res = xhr.responseText;
      eval(res);
    }
  };
  xhr.send(null);
};
loadBundle();

var shouldReload = function(loc) {
  var GITLAB_SOURCE_PAGE_URL_REGEXP = /^\/([^\/]+)\/([^\/]+)\/(blob)\/.*$/;
  var GITLAB_MERGE_REQUEST_SOURCE_PAGE_URL_REGEXP = /^\/([^\/]+)\/([^\/]+)\/(merge_requests)\/([0-9]+)\/diffs$/;
  var GITLAB_COMMIT_PAGE_URL_REGEXP = /^\/([^\/]+)\/([^\/]+)\/(commit)\/.*$/;

  return GITLAB_SOURCE_PAGE_URL_REGEXP.exec(loc.pathname) ||
	GITLAB_MERGE_REQUEST_SOURCE_PAGE_URL_REGEXP.exec(loc.pathname) ||
	GITLAB_COMMIT_PAGE_URL_REGEXP.exec(loc.pathname);
};

window.onpopstate = function(event) {
  const newLocation = event.currentTarget.location;
  if (shouldReload(newLocation)) {
    window.location.reload();
  }
};

history.onpushstate = function(event) {
  const newLocation = event.currentTarget.location;
  if (shouldReload(newLocation)) {
    window.location.reload();
  }
};