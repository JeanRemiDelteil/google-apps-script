const authenticate = require('./functions/authenticate.js');
const listScriptFiles = require('./functions/listScriptFiles.js');
const handleError = require('./functions/handleError.js');

/**
 * List all remote Google Apps Script projects matching an optional name filter.
 *
 * @param {string} nameFilter - Filter to filter projects on.
 */
module.exports = (nameFilter) => {
    authenticate([], (err, auth) => {
        if (err) {
            handleError(auth, err);
        } else {
            listScriptFiles(auth, nameFilter, true, null, [], (err, files) => {
                if (err) {
                    handleError(err);
                }
            });
        }
    });
};
