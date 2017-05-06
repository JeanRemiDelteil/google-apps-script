var google = require('googleapis');
var fs = require('fs');
var rimrafAll = require('./rimrafAll.js');
var constants = require('../constants.js');

/**
 * Download files specified by include file
 *
 * @param {array} included - An authorized OAuth2 client.
 * @param {string} dir - Directory in which the project is located.
 * @param {callback} callback - The callback that handles the response.
 */
function downloadIncludedFiles(included, dir, callback) {
    if (dir) {
        var includeDir = './' + dir + '/' + constants.INCLUDE_DIR;
    } else {
        var includeDir = './' + constants.INCLUDE_DIR;
    }

    // Remove all files in includeDir
    fs.readdir(includeDir, function(err, allFiles) {
        if (err) {
            callback(err);
            return;
        } else {
            var filesToDelete = [];
            for (file in allFiles) {
                filesToDelete.push([includeDir, allFiles[file]]);
            }
            rimrafAll(filesToDelete, 0, function(err) {
                if (err) {
                    callback(err);
                    return;
                } else {
                    // TODO
                    callback();
                }
            });
        }
    });
}

module.exports = downloadIncludedFiles;
