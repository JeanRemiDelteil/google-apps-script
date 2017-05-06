var path = require('path');

function Constants() {
    Object.defineProperties(this, {
        'SCOPES': {
            value: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.scripts'
            ]
        },
        'APP_DIR': {
            value: path.join((process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE), '.google-apps-script/')
        },
        'TOKEN_FILE': {
            value: 'token.json'
        },
        'REDIRECT_URL': {
            value: 'urn:ietf:wg:oauth:2.0:oob'
        },
        'MIME_GAF': {
            value: 'application/vnd.google-apps.folder'
        },
        'MIME_GAS': {
            value: 'application/vnd.google-apps.script'
        },
        'MIME_GAS_JSON': {
            value: 'application/vnd.google-apps.script+json'
        },
        'META_DIR': {
            value: '.gas'
        },
        'META_LOCAL': {
            value: 'local.json'
        },
        'META_REMOTE': {
            value: 'remote.json'
        },
        'META_ID': {
            value: 'ID'
        },
        'INCLUDE_FILE': {
            value: 'GAS_INCLUDE'
        },
        'INCLUDE_DIR': {
            value: '.gas/include'
        },

        'CLIENT_ID': {
            value: '835520708717-cp90h45vu3jdeedoi9i0j7vhlaklmdg2.apps.googleusercontent.com'
        },
        'CLIENT_SECRET': {
            value: 'zZLJL0FlCAn_PzQpFV3wRLLM'
        },
    });
}


module.exports = new Constants();
