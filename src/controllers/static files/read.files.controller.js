const fileController = {};
const fs = require('fs')
const stream = require('stream');
const pathRes = require('path');
const File = require('../../models/file')

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

fileController.create = async (req, res, next) => {
  try {
    let fileObject = req.files.thumbnail;
    let filePath = req.files.thumbnail.path.substr(req.files.thumbnail.path.lastIndexOf('\\') + 1);
    const newFile = new File({
      filePath,
      fileName: fileObject.name,
      fileContentType: fileObject.name,
      fileContentType: fileObject.type
    });

    newFile.save().then(doc => {
      console.log(doc);
      return res.status(200).send({
        fileId: doc.id
      });
    }).catch(err => {
      return res.status(500).send({
        message: err.message
      })
    });
  } catch (error) {
    next(e);
  }
}
module.exports = fileController;
