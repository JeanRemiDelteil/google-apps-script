var authenticate = require('./functions/authenticate.js');
var listAllScriptFiles = require('./functions/listAllScriptFiles.js');

module.exports = function() {
    authenticate([], function(auth) {
        listAllScriptFiles(auth, null);
    });
};
