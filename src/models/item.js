const { Double } = require('mongodb');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const ItemSchema = mongoose.Schema({
    name: { type: String, default: 'name', required: true },
    admins: {type: [mongoose.Schema.Types.ObjectId], required: false, ref: 'user' },
    itemNumber: { type: String, required: true, index: { unique: true } },
    image: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'file' },
    isActive: { type: Boolean, required: true, default: true },
    country: { type: String, required: true},
    city: { type: String, required: true},
    menu: { type: String, required: false},
    category: { type: [mongoose.Schema.Types.ObjectId], required: true, ref: 'category'},
    locationUrl: { type: String, required: false},
    dateCreated: {type: Date,  default: new Date()},
    createdBy: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'user' },
    // price: { type: Double, required: true}

});

ItemSchema.plugin(autoIncrement.plugin,  {
    model: 'item',
    field: 'itemNumber',
    startAt: (new Date()).getUTCFullYear()+40*2,
    incrementBy: 1
  })
module.exports = mongoose.model('item', ItemSchema)
