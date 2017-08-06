const readline = require('readline');
const authenticate = require('./functions/authenticate.js');
const parseIncludeFile = require('./functions/parseIncludeFile.js');
const downloadIncludedFiles = require('./functions/downloadIncludedFiles.js');
const handleError = require('./functions/handleError.js');
const getId = require('./functions/getId.js');
const displayCheckbox = require('./functions/displayCheckbox.js');
const checkNewVersion = require('./functions/checkNewVersion.js');

/**
 * Download included Google Apps Script files to includeDir folder
 *
 * @returns {void}
 */
module.exports = () => {
    const checkedVersion = checkNewVersion();
    const gotAuth = authenticate([]);
    const gotId = getId(undefined, '.');
    const parsed = parseIncludeFile();

    const checked = checkedVersion.then(() => {
        process.stdout.write('Downloading included files...\n');
    });

    const downloaded = Promise.all([checked, parsed, ]).then((values) => {
        return downloadIncludedFiles(values[1], null);
    });

    downloaded.then((result) => {
        process.stdout.write(`${result.successful.length} included file(s) were successfully updated`);
        displayCheckbox('green');
        if (result.failed.length > 0) {
            process.stdout.write(`${result.failed.length} included file(s) failed, doublecheck if their url(s) are correct and retry`);
            displayCheckbox('red');
            for (const fail of result.failed) {
                process.stdout.write(`   - ${fail}\n`);
            }
        }
    }).catch((err) => {
        handleError(err, true);
        return;
    });
};
