var constants = require('../constants.js');
var fs = require('fs');

var include = new RegExp('^(\'([^\']*)\'|\"([^\"]*)\")[ ]*-[ ]*(\'([^\']*)\'|\"([^\"]*)\")[ ]*$');
var ignore = new RegExp('^([ ]*//.*)|([ ]*)$');

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
            callback(err);
            return;
        } else {

            // Parse content of include file
            var files = [];
            var lineNr = 0;
            lines = content.split("\n");

            for (line of lines) {
                lineNr++;
                var matchInclude = include.exec(line);
                var matchIgnore = ignore.exec(line);

                if (matchInclude) {
                    var name = '';
                    var url = '';

                    if (matchInclude[2]) {
                        name = matchInclude[2];
                    } else if (matchInclude[3]) {
                        name = matchInclude[3];
                    } else {
                        callback('There seems to be a mistake in your ' + constants.INCLUDE_FILE + ' file at line ' + lineNr + '.');
                        return;
                    }

                    if (matchInclude[5]) {
                        url = matchInclude[5];
                    } else if (matchInclude[6]) {
                        url = matchInclude[6];
                    } else {
                        callback('There seems to be a mistake in your ' + constants.INCLUDE_FILE + ' file at line ' + lineNr + '.');
                        return;
                    }

                    files.push([name, url]);
                } else if (matchIgnore) {
                    // Do nothing
                } else {
                    callback('There seems to be a mistake in your ' + constants.INCLUDE_FILE + ' file at line ' + lineNr + '.');
                    return;
                }
            }
            callback(null, files);
            return;
        }
    });
}

module.exports = parseIncludeFile;
