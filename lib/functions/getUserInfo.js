const google = require('googleapis');

/**
 * Log info about users
 *
 * @param {google.auth.OAuth2} auth - An authorized OAuth2 client.
 */
function getUserInfo(auth, callback) {
    var oauth2 = google.oauth2({
        auth: auth,
        version: 'v2'
    });

    oauth2.userinfo.v2.me.get(function(err, res) {
        callback(err, res);
    });
}

module.exports = getUserInfo;
