const authenticate = require('./functions/authenticate.js');
const getId = require('./functions/getId.js');
const getMetadata = require('./functions/getMetadata.js');
const handleError = require('./functions/handleError.js');
const displayProjectInfo = require('./functions/displayProjectInfo.js');

/**
 * Display info about a google apps script project
 *
 * @param {string} fileId - Id of the project we want info about.
 * @returns {void}
 */
module.exports = (identifier) => {
    authenticate([], (err, auth) => {
        if (err) {
            handleError(auth, err, false);
        } else {
            if (identifier === undefined) {
                getId((err, id, dir) => {
                    if (err) {
                        handleError(auth, err, false);
                    } else {
                        getMetadata(auth, id, (err, metadata) => {
                            if (err) {
                                handleError(auth, err, false);
                            } else {
                                displayProjectInfo(metadata);
                            }
                        });
                    }
                });
            } else {
                getMetadata(auth, identifier, (err, metadata) => {
                    if (err) {
                        handleError(auth, err, false);
                    } else {
                        displayProjectInfo(metadata);
                    }
                });
            }
        }
    });
};
