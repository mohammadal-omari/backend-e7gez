const fileController = {};
const fs = require('fs')
const stream = require('stream');
const pathRes = require('path');


fileController.get = async (req, res, next) => {
  
    try {
        const { path } = req.params;
        const file = pathRes.resolve(__dirname + './../../upload/' + path);
        console.log(file);
        const r = fs.createReadStream(file) // or any other way to get a readable stream
        const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
        stream.pipeline(
         r,
         ps, // <---- this makes a trick with stream error handling
         (err) => {
          if (err) {
            console.log(err) // No such file or any other kind of error
            return res.sendStatus(400); 
          }
        })
        ps.pipe(res)
    } catch (e) {
      next(e);
    }
  };

  module.exports =  fileController;