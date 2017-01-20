var authenticate = require('./functions/authenticate.js');

module.exports = function(options) {
    authenticate(options, function(err, token) {
      if (err) {
          console.log('The api returned an error: ' + err);
      } else {
          console.log('You are succesfully authenticated.');
      }
    });
}
