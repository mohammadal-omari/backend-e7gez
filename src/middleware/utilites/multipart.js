const multipart = require('connect-multiparty');
const path = require('path');
console.log(path.join(__dirname + '/../../upload'));
module.exports = multipart({ uploadDir:path.join(__dirname + '/../../upload')});
