var self = require('sdk/self');
var tabs = require('sdk/tabs');
var urls = require("sdk/url");
var { get, set } = require("sdk/preferences/service");
var pageMod = require("sdk/page-mod");
// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
	callback(text);
}

pageMod.PageMod({
  include: self.data.url("index.html"),
  contentScriptFile: "./js/internal_apps.js"
});



set("browser.newtab.url", self.data.url("index.html"));
exports.dummy = dummy;
