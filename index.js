var self = require('sdk/self');
const ntp = require('resource:///modules/NewTabURL.jsm');
ntp.NewTabURL.override(self.data.url("index.html"));
