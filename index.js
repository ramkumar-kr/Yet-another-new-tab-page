var self = require('sdk/self');
var tabs = require('sdk/tabs');
var { get, set } = require("sdk/preferences/service");
set("browser.newtab.url", self.data.url("index.html"));
