var constants = require('../constants.js');
var fs = require('fs');

/**
 * Parse the content of the include file.
 *
 * @param {callback} callback - The callback that handles the response.
 */
function parseIncludeFile(callback) {
    var includeFile = './' + constants.INCLUDE_FILE;
    fs.readFile(includeFile, 'utf8', function(err, content) {
        if (err) {
            if (err.code == 'ENOENT') {
                err = 'There appears to be no \'' + constants.INCLUDE_FILE + '\' file in this folder.'
            }
            callback(err, null);
            return;
        } else {

            // Parse content of include file
            // TODO parse gas-include.js

            var files = [];
            for (var filename in parsed) {
                var url = parsed[filename];
                files.push([filename, url]);
            }
            callback(null, files);
            return;
        }
    });
}

module.exports = parseIncludeFile;
