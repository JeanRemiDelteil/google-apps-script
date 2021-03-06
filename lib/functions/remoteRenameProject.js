const google = require('googleapis');

/**
 * Rename a script file in Google Drive
 *
 * @param {google.auth.OAuth2} auth - An authorized OAuth2 client.
 * @param {string} projectId - Id of the script project to rename.
 * @param {string} name - Old name of the Google Apps Script project.
 * @param {string} newName - New name to give to the new Google Apps Script project.
 * @returns {Promise} A promise resolving a boolean wether we renamed or not
 */
function renameRemote(auth, projectId, name, newName) {
    return new Promise((resolve, reject) => {
        if (newName === name) {
            resolve(false);
            return;
        }

        const drive = google.drive('v3');
        drive.files.update({
            auth,
            fileId: projectId,
            resource: {
                name: newName,
            },
        }, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

module.exports = renameRemote;
