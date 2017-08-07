const fs = require('fs-extra');
const path = require('path');
const constants = require('../constants.js');

/**
 * Get the id of the current google apps script project
 *
 * @param {string} identifier - Identifier if it is already known
 * @param {string} rootFolder - relative path to the rootFolder of the project
 * @returns {Promise} - A promise resolving an id
 */
function getId(identifier, rootFolder) {
    return new Promise((resolve, reject) => {
        if (identifier) {
            resolve(identifier);
            return;
        }
        const dir = path.join(rootFolder, constants.META_DIR, constants.META_ID);
        fs.readFile(dir, 'utf8', (err, id) => {
            if (err) {
                reject(err);
                return;
            } else {
                resolve(id);
                return;
            }
        });
    });
}

module.exports = getId;
