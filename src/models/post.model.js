const { Double } = require('mongodb');
const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');
// autoIncrement.initialize(mongoose.connection);

const PostSchema = mongoose.Schema({
    //postNumber: { type: String, required: true, index: { unique: true } },
    text: { type: String, default: 'text', required: true },
    image: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'file' },
    vendorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'vendor'},
    isActive: { type: Boolean, required: true, default: true },
    createdBy: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'user' },
    dateCreated: {type: Date,  default: Date.now()},
    dateUpdated: {type: Date,  default: Date.now()},
});

// ItemSchema.plugin(autoIncrement.plugin,  {
//     model: 'post',
//     field: 'postNumber',
//     startAt: (new Date()).getUTCFullYear()+40*2,
//     incrementBy: 1
//   })
module.exports = mongoose.model('post', PostSchema)
