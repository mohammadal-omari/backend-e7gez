const mongoose = require('mongoose');

const FeedSchema = mongoose.Schema({
    message: { type: String, default: 'no message', required: true },
    isActive: { type: Boolean, default: true, required: true },
    dateCreated: {type: Date,  default: new Date()},
    createdBy: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'user' }
}, { collection: 'feed' });



module.exports = mongoose.model('feed', FeedSchema)
