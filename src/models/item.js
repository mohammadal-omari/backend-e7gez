const { Double } = require('mongodb');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const ItemSchema = mongoose.Schema({
    name: { type: String, default: 'name', required: true },
    usertId: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'user' },
    itemNumber: { type: String, required: true, index: { unique: true } },
    image: { type: String, required: true, default: 'im-user.png' },
    location: { type: String, required: true}, 
    country: { type: String, required: true},
    menu: { type: String, required: true},
    // price: { type: Double, required: true}

});

ItemSchema.plugin(autoIncrement.plugin,  {
    model: 'item',
    field: 'itemNumber',
    startAt: (new Date()).getUTCFullYear()+40*2,
    incrementBy: 1
  })
module.exports = mongoose.model('item', ItemSchema)
