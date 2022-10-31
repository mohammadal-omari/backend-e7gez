const { Double } = require('mongodb');
const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');
// autoIncrement.initialize(mongoose.connection);

const PostCommentSchema = mongoose.Schema({
    postId: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'post' },
    userId: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'user' },
    text: { type: Boolean, required: true},
    dateCreated: {type: Date,  default: Date.now()},
    dateUpdated: {type: Date,  default: Date.now()},
});

// PostCommentSchema.plugin(autoIncrement.plugin,  {
//     model: 'postComment',
//     field: 'postCommentNumber',
//     startAt: (new Date()).getUTCFullYear()+40*2,
//     incrementBy: 1
//   })
module.exports = mongoose.model('postComment', PostCommentSchema)
