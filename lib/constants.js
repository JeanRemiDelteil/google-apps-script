const path = require('path');
const os = require('os');

/**
 * Define constants
 *
 * @returns {void}
 */
function Constants() {
    Object.defineProperties(this, {
        'SCOPES': {
            value: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.scripts',
                'email',
            ],
        },
        'APP_DIR': {
            value: path.join(os.homedir(), '.google-apps-script'),
        },
        'TOKEN_FILE': {
            value: 'token.json',
        },
        'INFO_FILE': {
            value: 'info.json',
        },
        'REDIRECT_URL': {
            value: 'http://localhost',
        },
        'REDIRECT_PORT': {
            value: '9012',
        },
        'MIME_GAF': {
            value: 'application/vnd.google-apps.folder',
        },
        'MIME_GAS': {
            value: 'application/vnd.google-apps.script',
        },
        'MIME_GAS_JSON': {
            value: 'application/vnd.google-apps.script+json',
        },
        'META_DIR': {
            value: '.gas',
        },
        'META_LOCAL': {
            value: 'local.json',
        },
        'META_REMOTE': {
            value: 'remote.json',
        },
        'META_ID': {
            value: 'ID',
        },
        'INCLUDE_FILE': {
            value: 'gas-include.js',
        },
        'INCLUDE_DIR': {
            value: 'gas-include',
        },
        'IGNORE': {
            value: '/*gas-ignore*/',
        },
        'CLIENT_ID': {
            value: '61176682709-pqt926aol813m3h6piccephh838olpko.apps.googleusercontent.com',
        },
        'CLIENT_SECRET': {
            value: 'Bc6bW9V1MMeUlpjx23hodvZL',
        },
    });
}

module.exports = new Constants();
