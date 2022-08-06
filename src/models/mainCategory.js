const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const CategorySchema = mongoose.Schema({
    categoryName: { type: String, default: 'categoryName', required: true },
    categoryCode: { type: String, default: 'RES', required: true },
    isActive: { type: Boolean, default: true, required: true },
    categoryNumber: { type: String, required: true, index: { unique: true } },
    dateCreated: {type: Date,  default: new Date()},
    createdBy: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'user' }
}, { collection: 'category' });


CategorySchema.plugin(autoIncrement.plugin,  {
    model: 'category',
    field: 'categoryNumber',
    startAt: (new Date()).getUTCFullYear()+40*2,
    incrementBy: 1
  })
module.exports = mongoose.model('category', CategorySchema)
