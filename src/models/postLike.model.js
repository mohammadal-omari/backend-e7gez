const { Double } = require('mongodb');
const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');
// autoIncrement.initialize(mongoose.connection);

const PostLikeSchema = mongoose.Schema({
    //postLikeNumber: { type: String, required: true, index: { unique: true } },
    postId: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'post' },
    userId: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'user' },
    flag: { type: Boolean, required: true},
    //vendorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'vendor'},
    dateCreated: {type: Date,  default: Date.now()},
    dateUpdated: {type: Date,  default: Date.now()},
});

// PostLikeSchema.plugin(autoIncrement.plugin,  {
//     model: 'postLike',
//     field: 'postLikeNumber',
//     startAt: (new Date()).getUTCFullYear()+40*2,
//     incrementBy: 1
//   })
module.exports = mongoose.model('postLike', PostLikeSchema)

