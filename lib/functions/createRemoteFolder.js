var google = require('googleapis');

module.exports = function create() {
    authenticate(create_folder);
}

/**
 * Create a folder
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
module.exports = function(auth) {
    var fileMetadata = {
        'name': 'Invoices',
        'mimeType': 'application/vnd.google-apps.folder'
    };
    var drive = google.drive('v3');
    drive.files.create({
        auth: auth,
        resource: fileMetadata,
        fields: 'id'
    }, function(err, file) {
        if (err) {
            // Handle error
            console.log(err);
        } else {
            console.log('Folder Id: ', file.id);
        }
    });
}
