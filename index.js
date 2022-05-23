//if (process.env.NODE_ENV !== 'production') require('dotenv').config(); //////////////////////////////////////////////////////
require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.API_PORT || 3000;

var server = app.listen(PORT, function () {
  var port = server.address().port;
  console.log(`Express is working on http://localhost:${port}`);
});

