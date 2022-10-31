const { Double } = require('mongodb');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const VendorSchema = mongoose.Schema({
    vendorNumber: { type: String, required: true, index: { unique: true } },
    name: { type: String, default: 'name', required: true },
    image: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'file' },
    isActive: { type: Boolean, required: true, default: true },
    country: { type: String, required: true},
    city: { type: String, required: true},
    menu: { type: String, required: false},
    category: { type: [mongoose.Schema.Types.ObjectId], required: true, ref: 'category'},
    locationUrl: { type: String, required: false},
    dateCreated: {type: Date,  default: Date.now()},
    createdBy: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'user' },
}, { collection: 'vendor' });

VendorSchema.plugin(autoIncrement.plugin,  {
    model: 'vendor',
    field: 'vendorNumber',
    startAt: (new Date()).getUTCFullYear()+40*2,
    incrementBy: 1
  })
module.exports = mongoose.model('vendor', VendorSchema)
