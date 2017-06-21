const fs = require('fs');
const constants = require('../constants.js');

/**
 * Get the id of the current google apps script project
 *
 * @param {callback} callback - The callback that handles the response.
 */
function getId(callback) {
    var uri = constants.META_DIR + '/' + constants.META_ID;
    fs.readFile(uri, 'utf8', function(err, data) {
        if (err) {
            callback(err, null, null);
            return;
        } else {
            callback(null, data, null);
            return;
        }
    });
}

module.exports = getId;
