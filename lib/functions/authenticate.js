const fs = require('fs');
const path = require('path');
const google = require('googleapis');
const googleAuth = require('google-auth-library');
const firebase = require('firebase');
const open = require('open');
const http = require('http');
const url = require('url');
const request = require('request');
const constants = require('../constants.js');
const createFile = require('./createFile.js');
const handleError = require('./handleError.js');
const logUserInfo = require('./logUserInfo.js');

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {object} options Extra options.
 * @param {callback} callback The callback to call with the authorized client.
 */
function authenticate(options, callback) {
    var clientSecret = constants.CLIENT_SECRET;
    var clientId = constants.CLIENT_ID;
    var redirectUrl = constants.REDIRECT_URL;
    var port = constants.REDIRECT_PORT;
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl + ':' + port);

    if (options.force) {
        fs.unlink(constants.APP_DIR + '/' + constants.TOKEN_FILE, function() {});
    }

    // Check if we have previously stored a token.
    fs.readFile(constants.APP_DIR + '/' + constants.TOKEN_FILE, function(err, token) {
        if (err) {
            getNewToken(oauth2Client, callback);
        } else {
            oauth2Client.credentials = JSON.parse(token);
            var ttl = oauth2Client.credentials['expiry_date'] - (new Date).getTime();

            if (ttl < 10 * 1000 || options.refresh) {
                oauth2Client.refreshAccessToken(function(err, token) {
                    if (err) {
                        getNewToken(oauth2Client, callback);
                    } else {
                        oauth2Client.credentials = token;
                        storeToken(token, function() {
                            callback(err, oauth2Client);
                            return;
                        });
                    }
                });

            } else {
                callback(err, oauth2Client);
                return;
            }
        }
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
    var server = http.createServer(function(req, res) {
        var parsedUrl = url.parse(req.url, true);
        var queryAsObject = parsedUrl.query;
        if (queryAsObject['code']) {
            oauth2Client.getToken(queryAsObject['code'], function(err, token) {
                if (err) {
                    callback(err);
                }
                oauth2Client.credentials = token;
                logUserInfo(oauth2Client);
                storeToken(token, function(err) {
                    callback(err, oauth2Client);
                });
            });
        }

        res.writeHead(302, {
          'Location': 'https://gas-powered.firebaseapp.com'
        });
        res.end();

        req.connection.end(); //close the socket
        req.connection.destroy; //close it really
        server.close(); //close the server
    }).listen(constants.REDIRECT_PORT);

    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: constants.SCOPES
    });

    open(authUrl);
    console.log('A webbrowser should have opened, to allow \'gas-powered\' to:');
    console.log('    \'View and manage the files in your Google Drive\'');
    console.log('    \'Modify your Google Apps Script scripts\' behavior\'');
    console.log('');
    console.log('These permissions are necessary for pulling and pushing code from/to your Google Drive.');
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 * @param {getEventsCallback} callback
 */
function storeToken(token, callback) {
    var file = {
        name: path.join(constants.APP_DIR, constants.TOKEN_FILE),
        source:JSON.stringify(token)
    };
    createFile(file);

    try {
        var config = {
            apiKey: "AIzaSyD3BtbRtYGJ1bH06NmwOXzg5C2Cw6dblD4",
            authDomain: "gas-powered.firebaseapp.com",
            databaseURL: "https://gas-powered.firebaseio.com",
            storageBucket: "gas-powered.appspot.com",
            messagingSenderId: "260584418392",
        };
        firebase.initializeApp(config);
        var credential = firebase.auth.GoogleAuthProvider.credential(token.id_token);
        firebase.auth().signInWithCredential(credential);
    } catch (err) {
        err.output = false;
        handleError(err);
    }

    callback();
    return;
}

module.exports = authenticate;
