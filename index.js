let NODE_ENV = process.env.NODE_ENV.replace(/["']/g, "").trim();
console.info(NODE_ENV);
require('dotenv').config({ path: `.env.${NODE_ENV}` });

const socketio = require('socket.io');

const app = require('./src/app');

const PORT = process.env.PORT || 3000;

var server = app.listen(PORT, function () {
  var port = server.address().port;
  console.log(`Express is working on http://localhost:${port}`);
});

const io = socketio(server).sockets;
