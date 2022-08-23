const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const fileSchema = mongoose.Schema({
    fileName: { type: String, default: 'fileName', required: true },
    filePath: { type: String, required: true },
    fileContentType: { type: String,  required: true },
    isActive: { type: Boolean, default: true, required: true },
    fileNumber: { type: String, required: true, index: { unique: true } },
    dateCreated: {type: Date,  default: new Date()},
    createdBy: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'user' }
}, { collection: 'file' });


fileSchema.plugin(autoIncrement.plugin,  {
    model: 'file',
    field: 'fileNumber',
    startAt: (new Date()).getUTCFullYear()+40*2,
    incrementBy: 1
  })
module.exports = mongoose.model('file', fileSchema)
