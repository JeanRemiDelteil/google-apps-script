const authenticate = require('./functions/authenticate.js');
const remoteCreateProject = require('./functions/remoteCreateProject.js');
const handleError = require('./functions/handleError.js');
const displayCheckbox = require('./functions/displayCheckbox.js');
const checkNewVersion = require('./functions/checkNewVersion.js');

/**
 * Create a new remote Google Apps Script project in your Google Drive.
 *
 * @param {string} name - Name of the new Google Apps Script project.
 * @returns {void}
 */
module.exports = (name) => {
    const checkedVersion = checkNewVersion();

    const output = checkedVersion.then(() => {
        process.stdout.write(`Creating \'${name}\' in your Google Drive...`);
    });

    const gotAuth = output.then(() => {
        return authenticate([]);
    });

    const createdProject = Promise.all([gotAuth, ]).then((values) => {
        return remoteCreateProject(values[0], name);
    });

    createdProject.then((result) => {
        displayCheckbox('green');
        console.log(`[${result.id}] ${result.name}`);
        return;
    }).catch((err) => {
        handleError(err, true);
        return;
    });
};
